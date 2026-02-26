import { Plus, X, User, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import type { Contact } from "@/types/property";

interface ContactsSectionProps {
  contacts: Contact[];
  onChange: (contacts: Contact[]) => void;
}

export function ContactsSection({ contacts, onChange }: ContactsSectionProps) {
  const addContact = () => {
    onChange([...contacts, {
      name: "",
      role: "",
      email: "",
      phone: "",
      whatsapp: "",
    }]);
  };

  const removeContact = (index: number) => {
    onChange(contacts.filter((_, i) => i !== index));
  };

  const updateContact = (index: number, field: keyof Contact, value: string) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <FormSection 
      title="Property Contacts" 
      description="Add contact persons for this property"
    >
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div 
            key={index} 
            className="group relative bg-secondary/30 rounded-xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-200 animate-scale-in"
          >
            <button
              type="button"
              onClick={() => removeContact(index)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" htmlFor={`contact-name-${index}`}>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`contact-name-${index}`}
                      placeholder="John Doe"
                      value={contact.name}
                      onChange={(e) => updateContact(index, "name", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
                
                <FormField label="Role" htmlFor={`contact-role-${index}`}>
                  <Input
                    id={`contact-role-${index}`}
                    placeholder="e.g., Property Manager"
                    value={contact.role}
                    onChange={(e) => updateContact(index, "role", e.target.value)}
                  />
                </FormField>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Email" htmlFor={`contact-email-${index}`}>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`contact-email-${index}`}
                      type="email"
                      placeholder="email@example.com"
                      value={contact.email}
                      onChange={(e) => updateContact(index, "email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
                
                <FormField label="Phone" htmlFor={`contact-phone-${index}`}>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`contact-phone-${index}`}
                      type="tel"
                      placeholder="+1 234 567 890"
                      value={contact.phone}
                      onChange={(e) => updateContact(index, "phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
                
                <FormField label="WhatsApp" htmlFor={`contact-whatsapp-${index}`}>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`contact-whatsapp-${index}`}
                      type="tel"
                      placeholder="+1 234 567 890"
                      value={contact.whatsapp}
                      onChange={(e) => updateContact(index, "whatsapp", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addContact}
          className="w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>
    </FormSection>
  );
}
