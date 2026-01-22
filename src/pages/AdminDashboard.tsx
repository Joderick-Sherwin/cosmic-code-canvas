import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useProfileContent } from "@/hooks/useProfileContent";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Save, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedSection, setSelectedSection] = useState("hero");
  const [editedContent, setEditedContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { content, isLoading, updateContent, refetch } = useProfileContent();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin");
        return;
      }
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", user.id)
        .single();
      if (!adminData) {
        navigate("/admin");
        return;
      }
      setIsAuthorized(true);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (content[selectedSection]) {
      setEditedContent(JSON.stringify(content[selectedSection], null, 2));
    }
  }, [selectedSection, content]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const parsedContent = JSON.parse(editedContent);
      await updateContent(selectedSection, parsedContent);
      toast({ title: "Saved!", description: "Content updated successfully" });
      refetch();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Invalid JSON or save failed" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (!isAuthorized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const sections = Object.keys(content);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div className="glass-card rounded-xl p-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-semibold text-foreground mb-4">Sections</h2>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`w-full text-left px-4 py-2 rounded-lg capitalize transition-colors ${
                    selectedSection === section ? "bg-primary/20 text-primary" : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {section.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div className="lg:col-span-3 glass-card rounded-xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground capitalize">{selectedSection.replace(/_/g, " ")}</h2>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 btn-cosmic text-sm py-2"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="relative z-10">Save Changes</span>
              </button>
            </div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-[500px] p-4 rounded-xl bg-muted/50 border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary resize-none"
              spellCheck={false}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
