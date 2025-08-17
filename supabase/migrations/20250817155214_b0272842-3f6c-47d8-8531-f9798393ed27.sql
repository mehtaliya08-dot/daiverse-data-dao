-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  email TEXT,
  bio TEXT,
  avatar_url TEXT,
  twitter_handle TEXT,
  github_handle TEXT,
  total_earned DECIMAL DEFAULT 0,
  datasets_uploaded INTEGER DEFAULT 0,
  reputation_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create datasets table
CREATE TABLE public.datasets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cid TEXT NOT NULL, -- IPFS content identifier
  hash TEXT NOT NULL, -- Dataset hash for verification
  size BIGINT NOT NULL,
  license TEXT NOT NULL DEFAULT 'MIT',
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  contributor_id UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  download_count INTEGER DEFAULT 0,
  base_reward DECIMAL DEFAULT 50.0,
  total_rewards DECIMAL DEFAULT 0,
  blockchain_tx_hash TEXT, -- Transaction hash when approved on-chain
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create dao_proposals table
CREATE TABLE public.dao_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('dataset_approval', 'governance', 'treasury')),
  dataset_id UUID REFERENCES public.datasets(id),
  proposer_id UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'passed', 'failed', 'executed')),
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  total_voters INTEGER DEFAULT 0,
  quorum_reached BOOLEAN DEFAULT false,
  voting_ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  blockchain_proposal_id TEXT, -- On-chain proposal ID
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID REFERENCES public.dao_proposals(id) NOT NULL,
  voter_id UUID REFERENCES public.profiles(id) NOT NULL,
  vote_choice TEXT NOT NULL CHECK (vote_choice IN ('for', 'against', 'abstain')),
  voting_power DECIMAL NOT NULL DEFAULT 1.0,
  blockchain_tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(proposal_id, voter_id)
);

-- Create rewards table to track all token distributions
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id UUID REFERENCES public.profiles(id) NOT NULL,
  dataset_id UUID REFERENCES public.datasets(id),
  amount DECIMAL NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('base', 'retroactive', 'governance')),
  blockchain_tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('dataset_approved', 'dataset_rejected', 'reward_received', 'proposal_update')),
  read BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- Create policies for datasets
CREATE POLICY "Datasets are viewable by everyone" 
ON public.datasets FOR SELECT USING (true);

CREATE POLICY "Users can insert their own datasets" 
ON public.datasets FOR INSERT 
WITH CHECK (contributor_id IN (SELECT id FROM public.profiles WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

CREATE POLICY "Users can update their own datasets" 
ON public.datasets FOR UPDATE 
USING (contributor_id IN (SELECT id FROM public.profiles WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Create policies for DAO proposals
CREATE POLICY "Proposals are viewable by everyone" 
ON public.dao_proposals FOR SELECT USING (true);

CREATE POLICY "Users can create proposals" 
ON public.dao_proposals FOR INSERT 
WITH CHECK (proposer_id IN (SELECT id FROM public.profiles WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Create policies for votes
CREATE POLICY "Votes are viewable by everyone" 
ON public.votes FOR SELECT USING (true);

CREATE POLICY "Users can cast their own votes" 
ON public.votes FOR INSERT 
WITH CHECK (voter_id IN (SELECT id FROM public.profiles WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Create policies for rewards
CREATE POLICY "Rewards are viewable by everyone" 
ON public.rewards FOR SELECT USING (true);

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (user_id IN (SELECT id FROM public.profiles WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (user_id IN (SELECT id FROM public.profiles WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_datasets_updated_at
  BEFORE UPDATE ON public.datasets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dao_proposals_updated_at
  BEFORE UPDATE ON public.dao_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_datasets_contributor ON public.datasets(contributor_id);
CREATE INDEX idx_datasets_status ON public.datasets(status);
CREATE INDEX idx_datasets_tags ON public.datasets USING GIN(tags);
CREATE INDEX idx_proposals_status ON public.dao_proposals(status);
CREATE INDEX idx_votes_proposal ON public.votes(proposal_id);
CREATE INDEX idx_rewards_recipient ON public.rewards(recipient_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, read);