import * as React from 'react';
import { cn } from './utils';
import { VFButton } from './VFButton';

// Portal helper (standard react-dom overlay trigger)
import { createPortal } from 'react-dom';

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

// Backdrop Wrapper with escape listener
interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Backdrop({ isOpen, onClose, children, className, ...props }: BackdropProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-6 animate-fade-in",
          className
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        {...props}
      >
        {children}
      </div>
    </Portal>
  );
}

// VFModal / VFDialog
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
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "w-full max-w-lg bg-card border border-border rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in",
          className
        )}
      >
        {/* Header */}
        {!hideHeader && (title || description) && (
          <div className="flex items-start justify-between p-6 border-b border-border/40">
            <div className="space-y-1">
              {title && <h2 className="text-lg font-semibold text-foreground leading-none">{title}</h2>}
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close dialog"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

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
      </div>
    </Backdrop>
  );
}

// VFModal is functionally an alias to VFDialog but represents basic modal
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

// VFDrawer (Sliding sheet from the right)
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
    <Backdrop isOpen={isOpen} onClose={onClose} className="justify-end p-0 items-stretch">
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "w-full max-w-md bg-card border-l border-border shadow-2xl overflow-hidden flex flex-col h-full animate-slide-in-right",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border/40">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground leading-none">{title}</h2>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close drawer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
      </div>
    </Backdrop>
  );
}
