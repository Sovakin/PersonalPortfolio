import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SocialLinks from "@/components/SocialLinks";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (234) 567-8900",
      href: "tel:+12345678900"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Contact Me</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Let's Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">{info.label}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{info.value}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
