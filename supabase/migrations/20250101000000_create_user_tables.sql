-- Create user_checklist table to store completed checklist tasks
CREATE TABLE IF NOT EXISTS public.user_checklist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, task_id)
);

-- Create user_qpip_history table to store QPIP calculation history
CREATE TABLE IF NOT EXISTS public.user_qpip_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    calculation JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_checklist_user_id ON public.user_checklist(user_id);
CREATE INDEX IF NOT EXISTS idx_user_checklist_task_id ON public.user_checklist(task_id);
CREATE INDEX IF NOT EXISTS idx_user_qpip_history_user_id ON public.user_qpip_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_qpip_history_created_at ON public.user_qpip_history(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_qpip_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_checklist
-- Users can only see their own checklist items
CREATE POLICY "Users can view their own checklist"
    ON public.user_checklist
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own checklist items
CREATE POLICY "Users can insert their own checklist"
    ON public.user_checklist
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own checklist items
CREATE POLICY "Users can delete their own checklist"
    ON public.user_checklist
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create RLS policies for user_qpip_history
-- Users can only see their own QPIP history
CREATE POLICY "Users can view their own QPIP history"
    ON public.user_qpip_history
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own QPIP history
CREATE POLICY "Users can insert their own QPIP history"
    ON public.user_qpip_history
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own QPIP history
CREATE POLICY "Users can delete their own QPIP history"
    ON public.user_qpip_history
    FOR DELETE
    USING (auth.uid() = user_id);

