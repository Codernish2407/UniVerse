"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BrandMark } from "@/components/shared/BrandMark";
import { NavList } from "./AppSidebar";

/** Bottom-sheet drawer exposing every module (the "More" menu). */
export function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-auto bottom-0 left-0 max-h-[85dvh] max-w-full translate-x-0 translate-y-0 overflow-y-auto rounded-b-none rounded-t-3xl p-5 sm:max-w-full">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <DialogDescription className="sr-only">All UniVerse modules</DialogDescription>
        <BrandMark href="/dashboard" />
        <NavList onNavigate={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
