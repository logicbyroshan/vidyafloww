import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';
import { VFButton } from './VFButton';

// VFModal / VFDialog powered by Radix UI Dialog primitives + Framer Motion
export interface VFDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
}

export function VFDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerActions,
  className,
  hideHeader = false,
}: VFDialogProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-6"
              />
            </DialogPrimitive.Overlay>

            {/* Dialog Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
              <DialogPrimitive.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "pointer-events-auto w-full max-w-lg bg-card border border-border/70 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[88vh] outline-none",
                    className
                  )}
                >
                  {/* Header */}
                  {!hideHeader && (title || description) && (
                    <div className="flex items-start justify-between p-4 border-b border-border/50">
                      <div className="space-y-0.5">
                        {title && (
                          <DialogPrimitive.Title className="text-sm font-black text-foreground leading-tight tracking-tight">
                            {title}
                          </DialogPrimitive.Title>
                        )}
                        {description && (
                          <DialogPrimitive.Description className="text-sm text-muted-foreground">
                            {description}
                          </DialogPrimitive.Description>
                        )}
                      </div>
                      <DialogPrimitive.Close asChild>
                        <button
                          onClick={onClose}
                          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors outline-none"
                          aria-label="Close dialog"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </DialogPrimitive.Close>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 text-xs text-foreground/90 space-y-3">
                    {children}
                  </div>

                  {/* Footer */}
                  {footerActions && (
                    <div className="flex items-center justify-end gap-2 p-4 border-t border-border/50 bg-muted/15">
                      {footerActions}
                    </div>
                  )}
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

// VFModal is functionally an alias to VFDialog
export const VFModal = VFDialog;

// VFConfirmDialog (Standard alert dialog for warnings)
export interface VFConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger' | 'warning';
  isLoading?: boolean;
}

export function VFConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  isLoading = false,
}: VFConfirmDialogProps) {
  const confirmButtonVariant = {
    primary: "primary" as const,
    danger: "danger" as const,
    warning: "warning" as const,
  }[variant];

  return (
    <VFDialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      className="max-w-md"
      footerActions={
        <>
          <VFButton variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </VFButton>
          <VFButton variant={confirmButtonVariant} size="sm" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </VFButton>
        </>
      }
    >
      <div className="text-xs text-muted-foreground leading-relaxed">
        This action cannot be undone. Please confirm you would like to proceed.
      </div>
    </VFDialog>
  );
}

// VFDrawer (Sliding sheet from the right powered by Radix + Framer Motion)
export interface VFDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  className?: string;
}

export function VFDrawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerActions,
  className,
}: VFDrawerProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex justify-end"
              />
            </DialogPrimitive.Overlay>

            <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
              <DialogPrimitive.Content asChild>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "pointer-events-auto w-full max-w-md bg-card border-l border-border shadow-2xl overflow-hidden flex flex-col h-full outline-none",
                    className
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between p-6 border-b border-border/40">
                    <div className="space-y-1">
                      <DialogPrimitive.Title className="text-lg font-semibold text-foreground leading-none">
                        {title}
                      </DialogPrimitive.Title>
                      {description && (
                        <DialogPrimitive.Description className="text-xs text-muted-foreground">
                          {description}
                        </DialogPrimitive.Description>
                      )}
                    </div>
                    <DialogPrimitive.Close asChild>
                      <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Close drawer"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </DialogPrimitive.Close>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6 text-sm text-foreground/90 space-y-4">
                    {children}
                  </div>

                  {/* Footer */}
                  {footerActions && (
                    <div className="flex items-center justify-end gap-2 p-6 border-t border-border/40 bg-muted/20">
                      {footerActions}
                    </div>
                  )}
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
