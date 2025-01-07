import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Twitter } from 'lucide-react';

interface PaymentSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentSupportModal({ open, onOpenChange }: PaymentSupportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Payment Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-lg">
            Contact support to make payment through crypto. Response is immediate.
          </p>
          <p className="text-lg text-yellow-600 dark:text-yellow-400">
            Apologies for the inconvenience.
          </p>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => window.open('https://discord.gg/PN85bBuuqg', '_blank')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join Discord Support
          </Button>
          <Button 
            className="w-full bg-black hover:bg-gray-800"
            onClick={() => window.open('https://x.com/DobaIbrahim', '_blank')}
          >
            <Twitter className="mr-2 h-5 w-5" />
            Contact on X
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}