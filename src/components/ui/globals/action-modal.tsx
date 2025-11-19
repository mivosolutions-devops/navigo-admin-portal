import { type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "../drawer";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "../button";

const ActionModal: FC<TActionModalProps> = ({
  children,
  description,
  title,
  trigger,
  wrapperStyles,
  footerContent,
  isOpen,
  setIsOpen
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={cn("sm:max-w-md gap-5 py-8 z-[1999] px-0", wrapperStyles)}
        >
          <DialogHeader className='gap-2 border-b'>
            <DialogTitle className='text-center mx-16 leading-6'>
              {title}
            </DialogTitle>
            <DialogDescription className='text-center font-medium'>
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className='w-full px-6 my-2'>{children}</div>
          <DialogFooter className='w-full flex items-center !justify-center'>
            {footerContent}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionModal;
