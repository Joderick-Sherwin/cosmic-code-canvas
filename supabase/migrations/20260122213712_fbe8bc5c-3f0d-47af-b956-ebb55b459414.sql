-- Create profile content table to store editable content
CREATE TABLE public.profile_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profile_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access (portfolio is public)
CREATE POLICY "Anyone can view profile content"
ON public.profile_content
FOR SELECT
USING (true);

-- Create admin_users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can view admin_users
CREATE POLICY "Admins can view their own record"
ON public.admin_users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = _user_id
  )
$$;

-- Only admins can update profile content
CREATE POLICY "Admins can update profile content"
ON public.profile_content
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only admins can insert profile content
CREATE POLICY "Admins can insert profile content"
ON public.profile_content
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can delete profile content
CREATE POLICY "Admins can delete profile content"
ON public.profile_content
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profile_content_updated_at
BEFORE UPDATE ON public.profile_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial profile data
INSERT INTO public.profile_content (section_key, content) VALUES
('hero', '{"name": "Joderick Sherwin J", "title": "Machine Learning Engineer", "subtitle": "Transforming Ideas into Intelligent Solutions", "location": "Chennai, Tamil Nadu, India"}'),
('summary', '{"text": "A highly motivated Honours Computer Science and Engineering student at Rajalakshmi Engineering College, specializing in Machine Learning. Driven by a passion for real-world technology applications, I possess a strong foundation in programming, practical experience gained through diverse projects and hackathons, and a commitment to continuous learning. I thrive in collaborative environments and seek challenging opportunities to contribute to both personal and professional growth."}'),
('contact', '{"email": "jodericksherwinjohn@gmail.com", "phone": "+91 70949 44667", "location": "Chennai, Tamil Nadu, India"}'),
('experience', '{"items": [{"title": "Machine Learning Engineer Intern", "company": "Revol Process Solutions Pvt. Ltd.", "period": "Jan 2024 – July 2024", "description": ["Designed and implemented content-based and collaborative filtering recommendation models using Python and Scikit-learn, resulting in improved model accuracy and system scalability.", "Developed and deployed RESTful APIs using Python Flask to serve machine learning predictions, facilitating seamless integration into web applications.", "Integrated recommendation systems into web applications, ensuring real-time performance and user experience.", "Collaborated with cross-functional teams to optimize model performance and system scalability, demonstrating teamwork and problem-solving abilities."]}, {"title": "Project Intern – IoT & ES", "company": "Revol Process Solutions Pvt. Ltd.", "period": "Sep 2022 – Nov 2022", "description": ["Developed a robust system for RS232 serial data transfer from Arduino microcontrollers to a remote server via Wi-Fi (ESP8266/ESP32), demonstrating proficiency in hardware-software integration.", "Configured and programmed Arduino microcontrollers for real-time data transmission and remote monitoring.", "Ensured stable and secure communication between hardware and server using network protocols, showcasing strong technical skills."]}]}'),
('skills', '{"categories": [{"name": "Programming Languages", "items": ["Python", "HTML", "CSS", "JavaScript"]}, {"name": "Machine Learning", "items": ["Deep Learning", "Natural Language Processing", "Computer Vision", "Prompt Engineering", "Scikit-learn"]}, {"name": "Frameworks/Tools", "items": ["TensorFlow", "Keras", "OpenCV", "Flask", "PostgreSQL", "NumPy", "Generative AI APIs"]}, {"name": "Other", "items": ["Multithreading", "Multiprocessing", "Agile Methodologies", "Project Management", "Team Leadership"]}]}'),
('projects', '{"items": [{"title": "TerraDefender – Military IPB System", "subtitle": "Deep Learning Terrain Analysis", "description": "Engineered a Deep Learning system for analyzing terrain, infrastructure, and environmental conditions from aerial and satellite imagery. Developed models for terrain classification, building layout extraction, and feature identification to support mission-critical planning.", "technologies": ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "Multithreading"]}, {"title": "Analyst Recommendation System", "subtitle": "AI-Driven Analyst Matching", "description": "Developed an AI-driven recommendation system to match analysts with projects based on expertise, historical performance, and task context. Utilized machine learning algorithms to evaluate multi-dimensional data inputs and generate optimal analyst-to-task assignments.", "technologies": ["Python", "Scikit-learn", "Pandas", "Flask", "SQL", "Machine Learning"]}, {"title": "Animoji Simulation Project", "subtitle": "Computer Vision Facial Tracking", "description": "Developed a real-time facial tracking system using computer vision and machine learning to replicate user expressions on 3D animated characters.", "technologies": ["Python", "OpenCV", "MediaPipe"]}, {"title": "Intelligent Document Query System", "subtitle": "RAG System", "description": "Built a Retrieval-Augmented Generation (RAG) system to enable intelligent document understanding through text and image embedding for semantic retrieval.", "technologies": ["Python", "Flask", "PostgreSQL", "NumPy", "Generative AI API"]}]}'),
('education', '{"items": [{"institution": "Rajalakshmi Engineering College (Autonomous)", "degree": "Bachelor of Engineering in Computer Science and Engineering (Hons)", "period": "2022 – 2026", "note": "Expected Graduation: May 2026"}, {"institution": "The Velammal Engineering School", "degree": "Higher Secondary Education", "period": "2020 – 2022"}]}'),
('certifications', '{"items": ["Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning", "Springboard AI Primer Certification", "Springboard Artificial Intelligence Foundation", "InternEzy Certificate of Training in Machine Learning", "PostgreSQL Training - EdgeVerve Systems Ltd.", "Spring Framework Training - EdgeVerve Systems Ltd.", "Spring Boot Training - EdgeVerve Systems Ltd.", "JUnit & JMeter Training - EdgeVerve Systems Ltd.", "Basic & Advanced JS - EdgeVerve Systems Ltd."]}'),
('awards', '{"items": [{"title": "Best Speaker Award", "description": "Research Paper: TerraDefender: A Deep Learning Approach to Disaster Response - Mi-IRICT 24"}, {"title": "2nd Place – National Grand Research Competition 2025", "description": "Research Paper: TerraDefender: Navigating Disaster Zones with Precision Terrain Insight"}, {"title": "Special Mention - Project TerraDefender", "description": "National Project Expo SCIMIT24"}]}'),
('leadership', '{"items": [{"role": "Secretary & Machine Learning Lead", "organization": "IEEE Computer Society", "period": "2024–2025"}, {"role": "AI Lead", "organization": "Intellexa Club", "period": "2024–2025"}, {"role": "Team Lead", "organization": "Project TerraDefender", "period": ""}, {"role": "Intern Team Lead", "organization": "Revol Process Solutions Pvt. Ltd.", "period": ""}, {"role": "NCC Cadet [Rank - CQMS]", "organization": "1 TN Armd Sqn NCC, Army Wing", "period": "2023-2026"}, {"role": "NSS Coordinator", "organization": "", "period": "2022-2023"}]}')