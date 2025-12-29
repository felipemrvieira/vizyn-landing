import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

const Header = () => {
  const navItems = ["Home", "Recursos", "Preço", "FAQ", "Contato"];

  const navTargets: Record<string, string[]> = useMemo(
    () => ({
      Home: [],
      Recursos: ["recursos", "features", slugify("Recursos")],
      Preço: ["preço", "preco", "pricing", slugify("Preço")],
      FAQ: ["faq", slugify("FAQ")],
      Contato: ["contato", "contact", slugify("Contato")],
    }),
    []
  );

  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.scrollY < 50) {
        setActiveSection("home");
        return;
      }

      const sections = [
        "recursos",
        "features",
        "como-funciona",
        "preço",
        "preco",
        "pricing",
        "faq",
        "contato",
        "contact",
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeSection !== section) setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const findFirstExistingTarget = (item: string) => {
    const candidates = navTargets[item] ?? [slugify(item)];
    for (const id of candidates) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  };

  const handleNavClick = (item: string) => {
    setIsOpen(false);

    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = findFirstExistingTarget(item);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isActiveItem = (item: string) => {
    if (item === "Home") return activeSection === "home";
    const candidates = navTargets[item] ?? [slugify(item)];
    return candidates.includes(activeSection);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/60 backdrop-blur-sm shadow-xs"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-6 py-4 flex items-center justify-between"
        )}
      >
        <Logo />

        <div className="flex items-center gap-2.5">
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                onClick={() => handleNavClick(item)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                className={cn(
                  "cursor-pointer transition-colors relative group",
                  isActiveItem(item)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-accent-foreground hover:text-indigo-600 dark:hover:text-indigo-400"
                )}
              >
                {item}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all",
                    isActiveItem(item) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </motion.button>
            ))}

            <Button variant="default">Agendar demo</Button>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <Menu className="size-4" />
                </Button>
              </DrawerTrigger>

              <DrawerContent className="px-6 pb-8">
                <DrawerTitle></DrawerTitle>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start hover:text-indigo-600 dark:hover:text-indigo-400",
                        isActiveItem(item) &&
                          "text-indigo-600 dark:text-indigo-400 font-medium"
                      )}
                    >
                      {item}
                    </Button>
                  ))}
                  <div className="pt-4">
                    <RainbowButton
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Agendar demo
                    </RainbowButton>
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>

          {mounted && (
            <Button
              className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground"
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
