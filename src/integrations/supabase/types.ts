export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      dao_proposals: {
        Row: {
          blockchain_proposal_id: string | null
          created_at: string
          dataset_id: string | null
          description: string
          id: string
          proposal_type: string
          proposer_id: string
          quorum_reached: boolean | null
          status: string
          title: string
          total_voters: number | null
          updated_at: string
          votes_against: number | null
          votes_for: number | null
          voting_ends_at: string
        }
        Insert: {
          blockchain_proposal_id?: string | null
          created_at?: string
          dataset_id?: string | null
          description: string
          id?: string
          proposal_type: string
          proposer_id: string
          quorum_reached?: boolean | null
          status?: string
          title: string
          total_voters?: number | null
          updated_at?: string
          votes_against?: number | null
          votes_for?: number | null
          voting_ends_at: string
        }
        Update: {
          blockchain_proposal_id?: string | null
          created_at?: string
          dataset_id?: string | null
          description?: string
          id?: string
          proposal_type?: string
          proposer_id?: string
          quorum_reached?: boolean | null
          status?: string
          title?: string
          total_voters?: number | null
          updated_at?: string
          votes_against?: number | null
          votes_for?: number | null
          voting_ends_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dao_proposals_dataset_id_fkey"
            columns: ["dataset_id"]
            isOneToOne: false
            referencedRelation: "datasets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dao_proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      datasets: {
        Row: {
          base_reward: number | null
          blockchain_tx_hash: string | null
          category: string
          cid: string
          contributor_id: string
          created_at: string
          description: string | null
          download_count: number | null
          hash: string
          id: string
          license: string
          size: number
          status: string
          tags: string[] | null
          title: string
          total_rewards: number | null
          updated_at: string
        }
        Insert: {
          base_reward?: number | null
          blockchain_tx_hash?: string | null
          category: string
          cid: string
          contributor_id: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          hash: string
          id?: string
          license?: string
          size: number
          status?: string
          tags?: string[] | null
          title: string
          total_rewards?: number | null
          updated_at?: string
        }
        Update: {
          base_reward?: number | null
          blockchain_tx_hash?: string | null
          category?: string
          cid?: string
          contributor_id?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          hash?: string
          id?: string
          license?: string
          size?: number
          status?: string
          tags?: string[] | null
          title?: string
          total_rewards?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "datasets_contributor_id_fkey"
            columns: ["contributor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          metadata: Json | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          datasets_uploaded: number | null
          email: string | null
          github_handle: string | null
          id: string
          reputation_score: number | null
          total_earned: number | null
          twitter_handle: string | null
          updated_at: string
          username: string | null
          wallet_address: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          datasets_uploaded?: number | null
          email?: string | null
          github_handle?: string | null
          id?: string
          reputation_score?: number | null
          total_earned?: number | null
          twitter_handle?: string | null
          updated_at?: string
          username?: string | null
          wallet_address: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          datasets_uploaded?: number | null
          email?: string | null
          github_handle?: string | null
          id?: string
          reputation_score?: number | null
          total_earned?: number | null
          twitter_handle?: string | null
          updated_at?: string
          username?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          amount: number
          blockchain_tx_hash: string | null
          created_at: string
          dataset_id: string | null
          id: string
          recipient_id: string
          reward_type: string
        }
        Insert: {
          amount: number
          blockchain_tx_hash?: string | null
          created_at?: string
          dataset_id?: string | null
          id?: string
          recipient_id: string
          reward_type: string
        }
        Update: {
          amount?: number
          blockchain_tx_hash?: string | null
          created_at?: string
          dataset_id?: string | null
          id?: string
          recipient_id?: string
          reward_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_dataset_id_fkey"
            columns: ["dataset_id"]
            isOneToOne: false
            referencedRelation: "datasets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rewards_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          blockchain_tx_hash: string | null
          created_at: string
          id: string
          proposal_id: string
          vote_choice: string
          voter_id: string
          voting_power: number
        }
        Insert: {
          blockchain_tx_hash?: string | null
          created_at?: string
          id?: string
          proposal_id: string
          vote_choice: string
          voter_id: string
          voting_power?: number
        }
        Update: {
          blockchain_tx_hash?: string | null
          created_at?: string
          id?: string
          proposal_id?: string
          vote_choice?: string
          voter_id?: string
          voting_power?: number
        }
        Relationships: [
          {
            foreignKeyName: "votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "dao_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
