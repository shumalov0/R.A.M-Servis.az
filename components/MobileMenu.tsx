// "use client";

// import { Button } from "@/components/ui/button";
// import { Car, Heart, Menu } from "lucide-react";
// import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";
// import { Translation } from "@/lib/translations";
// import Link from "next/link";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useFavorites } from "@/hooks/use-favorites";
// import Logo from "./Logo";

// interface MobileMenuProps {
//   currentLang: string;
//   onLanguageChange: (lang: string) => void;
//   t: Translation;
// }

// export default function MobileMenu({
//   currentLang,
//   onLanguageChange,
//   t,
// }: MobileMenuProps) {
//   const { count } = useFavorites();
//   const menuItems = [
//     { href: "/", label: t?.cars || "Home" },
//     { href: "/cars", label: t?.cars || "Cars" },
//     { href: "/services", label: t?.services || "Services" },
//     { href: "/about", label: t?.about || "About" },
//     { href: "/contact", label: t?.contact || "Contact" },
//   ];

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="md:hidden w-9 h-9 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
//           aria-label="Open menu"
//         >
//           <Menu className="h-5 w-5" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent
//         side="right"
//         className="w-80 max-w-[90vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-0"
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
//             <Link
//               href="/"
//               className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
//             >
//           <div className="flex items-center space-x-2 cursor-pointer w-8  h-8">
//             <Logo lightSrc="/icons/black.svg" darkSrc="/icons/white.svg" heightClass="h-[150px] " />
//           </div>
//             </Link>

//                           <LanguageSwitcher
//                 currentLang={currentLang}
//                 onLanguageChange={onLanguageChange}
//               />
//           </div>

//           <nav className="flex-1 px-6 py-8 overflow-y-auto">
//             <ul className="space-y-6">
//               {menuItems.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-4 rounded-lg hover:bg-amber-50/50 dark:hover:bg-gray-800/50"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
//             <div className="flex items-center justify-between">
//             <Link
//               href="/favorites"
//               className="relative inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
//             >
//               <Heart className="h-5 w-5 mr-1" />

//               {count > 0 && (
//                 <span className="ml-2 inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full bg-amber-600 text-white text-xs">
//                   {count}
//                 </span>
//               )}
//             </Link>
//               <ThemeToggle />
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
// "use client";

// import { Button } from "@/components/ui/button";
// import { Car, Heart, Menu, Info, Phone, Home } from "lucide-react";
// import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";
// import { Translation } from "@/lib/translations";
// import Link from "next/link";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useFavorites } from "@/hooks/use-favorites";
// import Logo from "./Logo";
// import { motion } from "framer-motion";


// interface MobileMenuProps {
//   currentLang: string;
//   onLanguageChange: (lang: string) => void;
//   t: Translation;
// }

// export default function MobileMenu({
//   currentLang,
//   onLanguageChange,
//   t,
// }: MobileMenuProps) {
//   const { count } = useFavorites();

//   const menuItems = [
//     { href: "/", label: t?.home || "Home", icon: Home },
//     { href: "/cars", label: t?.cars || "Cars", icon: Car },
//     { href: "/services", label: t?.services || "Services", icon: Info },
//     { href: "/about", label: t?.about || "About", icon: Info },
//     { href: "/contact", label: t?.contact || "Contact", icon: Phone },
//   ];

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="md:hidden w-10 h-10 text-gray-700 dark:text-gray-300 hover:bg-gray-200/40 dark:hover:bg-gray-800/40 rounded-full"
//           aria-label="Open menu"
//         >
//           <Menu className="h-6 w-6" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent
//         side="right"
//         className="w-80 max-w-[90vw] bg-white/70 dark:bg-gray-900/70 border-l border-gray-200/30 dark:border-gray-700/30 backdrop-blur-xl p-0 shadow-2xl"
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200/30 dark:border-gray-700/30">
//             <Link
//               href="/"
//               className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
//             >
//               <div className="flex items-center space-x-2 cursor-pointer w-8 h-8">
//                 <Logo
//                   lightSrc="/icons/black.svg"
//                   darkSrc="/icons/white.svg"
//                   heightClass="h-[140px]"
//                 />
//               </div>
//             </Link>

//             <LanguageSwitcher
//               currentLang={currentLang}
//               onLanguageChange={onLanguageChange}
//             />
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-6 py-8 overflow-y-auto">
//             <ul className="space-y-4">
//               {menuItems.map((item, i) => (
//                 <motion.li
//                   key={item.href}
//                   initial={{ opacity: 0, x: 30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.08 }}
//                 >
//                   <Link
//                     href={item.href}
//                     className="flex items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all py-3 px-4 rounded-xl hover:bg-amber-50/60 dark:hover:bg-gray-800/50 hover:scale-[1.02]"
//                   >
//                     <item.icon className="h-5 w-5 text-amber-500" />
//                     {item.label}
//                   </Link>
//                 </motion.li>
//               ))}
//             </ul>
//           </nav>

//           {/* Footer */}
//           <div className="p-6 border-t border-gray-200/30 dark:border-gray-700/30">
//             <div className="flex items-center justify-between">
//               <Link
//                 href="/favorites"
//                 className="relative inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
//               >
//                 <Heart className="h-5 w-5 mr-2" />
//                 {count > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                     className="ml-1 inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full bg-amber-600 text-white text-xs shadow-md"
//                   >
//                     {count}
//                   </motion.span>
//                 )}
//               </Link>
//               <ThemeToggle />
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { Car, Heart, Menu, Info, Phone, Home, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Translation } from "@/lib/translations";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useFavorites } from "@/hooks/use-favorites";
import Logo from "./Logo";
import { motion } from "framer-motion";

interface MobileMenuProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: Translation;
}

export default function MobileMenu({
  currentLang,
  onLanguageChange,
  t,
}: MobileMenuProps) {
  const { count } = useFavorites();

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cars", label: t?.cars || "Cars", icon: Car },
    { href: "/services", label: t?.services || "Services", icon: Info },
    { href: "/about", label: t?.about || "About", icon: Info },
    { href: "/contact", label: t?.contact || "Contact", icon: Phone },
  ];

  return (
    <Sheet>
      {/* Trigger button */}
      <SheetTrigger asChild >
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden w-10 h-10 text-gray-700 dark:text-gray-300 hover:bg-gray-200/40 dark:hover:bg-gray-800/40 rounded-full"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Menu Content */}
      <SheetContent
      
        side="right"
       
        className="w-80 max-w-[90vw] bg-white/70 dark:bg-brand-dark/70 border-l border-gray-200/30 dark:border-gray-700/30 backdrop-blur-xl p-0 shadow-2xl [&>button:first-of-type]:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/30 dark:border-gray-700/30">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center space-x-2 cursor-pointer w-8 h-8">
                <Logo
                  lightSrc="/icons/black.svg"
                  darkSrc="/icons/white.svg"
                  heightClass="h-[140px]"
                />
              </div>
            </Link>

            {/* Language + Close */}
            <div className="flex items-center ">
              <LanguageSwitcher
                currentLang={currentLang}
                onLanguageChange={onLanguageChange}
              />
              <SheetClose asChild >
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Button>
              </SheetClose>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            <ul className="space-y-4">
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-brand-gold dark:hover:text-brand-gold transition-all py-3 px-4 rounded-xl hover:bg-amber-50/60 dark:hover:bg-gray-800/50 hover:scale-[1.02]"
                  >
                    <item.icon className="h-5 w-5 text-brand-gold" />
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <Link
                href="/favorites"
                className="relative inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-gold dark:hover:text-brand-gold transition-colors"
              >
                <Heart className="h-5 w-5 mr-2" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="ml-1 inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full bg-brand-gold text-white text-xs shadow-md"
                  >
                    {count}
                  </motion.span>
                )}
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
