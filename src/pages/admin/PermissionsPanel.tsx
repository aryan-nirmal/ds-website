import { Button } from "@/components/ui/button";
import { Shield, Check, X } from "lucide-react";
import { useState } from "react";

const PermissionsPanel = () => {
  const [roles, setRoles] = useState([
    {
      name: "Administrator",
      description: "Full access to all system features",
      permissions: { gallery: true, courses: true, magazine: true, settings: true }
    },
    {
      name: "Staff / Faculty",
      description: "Can manage courses and view student progress",
      permissions: { gallery: true, courses: true, magazine: false, settings: false }
    },
    {
      name: "Content Editor",
      description: "Can update gallery and magazines",
      permissions: { gallery: true, courses: false, magazine: true, settings: false }
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white mb-1">Access Control</h2>
          <p className="text-neutral-400 text-sm">Manage role-based permissions</p>
        </div>
        <Button className="bg-white/10 hover:bg-white/20 text-white">
          Create New Role
        </Button>
      </div>

      <div className="grid gap-6">
        {roles.map((role, idx) => (
          <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 0 ? "bg-red-900/20 text-red-500" : "bg-neutral-800 text-white"
                  }`}>
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-white font-heading tracking-wide">{role.name}</h3>
                  <p className="text-sm text-neutral-500">{role.description}</p>
                </div>
              </div>
              {idx > 0 && (
                <Button variant="outline" size="sm" className="border-white/10 text-neutral-400">
                  Edit Role
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
              {Object.entries(role.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-white/5 p-3 rounded border border-white/5">
                  <span className="text-sm text-neutral-300 capitalize">{key}</span>
                  {value ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <X size={16} className="text-red-500 opacity-50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsPanel;
