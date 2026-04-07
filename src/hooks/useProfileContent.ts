import { profileData } from "@/data/profileData";

export const useProfileContent = () => {
  return {
    content: profileData,
    isLoading: false,
    error: null,
    updateContent: async () => true,
    refetch: () => {},
  };
};
