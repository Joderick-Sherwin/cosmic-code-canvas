import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileContent {
  [key: string]: any;
}

export const useProfileContent = () => {
  const [content, setContent] = useState<ProfileContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profile_content")
        .select("section_key, content");

      if (error) throw error;

      const contentMap: ProfileContent = {};
      data?.forEach((item) => {
        contentMap[item.section_key] = item.content;
      });

      setContent(contentMap);
    } catch (err) {
      console.error("Error fetching profile content:", err);
      setError(err instanceof Error ? err.message : "Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (sectionKey: string, newContent: any) => {
    try {
      const { error } = await supabase
        .from("profile_content")
        .update({ content: newContent })
        .eq("section_key", sectionKey);

      if (error) throw error;

      setContent((prev) => ({
        ...prev,
        [sectionKey]: newContent,
      }));

      return true;
    } catch (err) {
      console.error("Error updating content:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, isLoading, error, updateContent, refetch: fetchContent };
};
