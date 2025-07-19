"use client";

import {
  useState,
  forwardRef,
  type InputHTMLAttributes,
  type ChangeEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  onValueChange?: (value: string) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      onValueChange,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [touched, setTouched] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(e.target.value);
      if (!touched) setTouched(true);
    };

    return (
      <div className={cn("space-y-2 my-5 py-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={cn(error && "text-destructive")}>
            {label}
          </Label>
        )}
        <div className="">
          <Input
            id={inputId}
            ref={ref}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            className={cn(
              error &&
                "border-destructive pr-10 focus-visible:ring-destructive",
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-destructive"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && touched ? (
          <p
            id={`${inputId}-error`}
            className="text-sm font-medium text-destructive"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export { FormInput };
