
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  branch TEXT NOT NULL,
  semester TEXT NOT NULL,
  subject TEXT NOT NULL,
  unit TEXT,
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materials are viewable by everyone"
ON public.materials FOR SELECT
USING (true);

CREATE INDEX idx_materials_lookup ON public.materials (branch, semester, subject);

INSERT INTO storage.buckets (id, name, public)
VALUES ('materials', 'materials', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access to materials bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'materials');
