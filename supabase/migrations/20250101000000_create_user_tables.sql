-- Single-user application: Use a constant UUID for all data
-- This allows cloud storage without authentication

-- Create user_checklist table to store completed checklist tasks
CREATE TABLE IF NOT EXISTS public.user_checklist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
    task_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, task_id)
);

-- Create user_qpip_history table to store QPIP calculation history
CREATE TABLE IF NOT EXISTS public.user_qpip_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
    calculation JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_checklist_user_id ON public.user_checklist(user_id);
CREATE INDEX IF NOT EXISTS idx_user_checklist_task_id ON public.user_checklist(task_id);
CREATE INDEX IF NOT EXISTS idx_user_qpip_history_user_id ON public.user_qpip_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_qpip_history_created_at ON public.user_qpip_history(created_at DESC);

-- Enable Row Level Security (RLS) but allow anonymous access for single-user app
ALTER TABLE public.user_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_qpip_history ENABLE ROW LEVEL SECURITY;

-- Create permissive RLS policies for single-user application
-- Allow all operations for the single user ID (anonymous access)
CREATE POLICY "Allow all operations for single user checklist"
    ON public.user_checklist
    FOR ALL
    USING (user_id = '00000000-0000-0000-0000-000000000000'::uuid)
    WITH CHECK (user_id = '00000000-0000-0000-0000-000000000000'::uuid);

CREATE POLICY "Allow all operations for single user QPIP history"
    ON public.user_qpip_history
    FOR ALL
    USING (user_id = '00000000-0000-0000-0000-000000000000'::uuid)
    WITH CHECK (user_id = '00000000-0000-0000-0000-000000000000'::uuid);
