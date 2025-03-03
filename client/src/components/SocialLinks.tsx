import {SiGithub, SiLinkedin, SiMastodon, SiSteam, SiTelegram, SiVk} from "react-icons/si";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function SocialLinks() {
  const socials = [
    {
      name: "GitHub",
      icon: SiGithub,
      url: "https://github.com/Sovakin",
    },
    {
      name: "Telegram",
      icon: SiTelegram,
      url: "https://t.me/emolutQQ",
    },
    {
      name: "Mastodon",
      icon: SiVk,
      url: "https://vk.com/name_oleg",
    },
  ];

  return (
    <div className="flex gap-2">
      {socials.map((social) => (
        <Tooltip key={social.name}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(social.url, "_blank")}
            >
              <social.icon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{social.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}