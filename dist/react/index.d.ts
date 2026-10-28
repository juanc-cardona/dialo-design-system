/*! Dialo Design System v1.0.0 · generado desde tokens/dialo.tokens.json · no editar a mano */
import type { FC, ReactNode, ReactElement, CSSProperties, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

/** Versión del logo: horizontal (principal), con respaldo "By axoncore", vertical o icono. */
export type LogoVersion = "horizontal" | "horizontal-endorsed" | "vertical" | "icon";
/** Color del logo según el fondo: positiva (blanco), negativa (azul Dialo), monocromías. El icono solo existe en positive y mono-black. */
export type LogoColor = "positive" | "negative" | "mono-black" | "mono-white";

export interface LogoProps {
  /** @default "horizontal" */
  version?: LogoVersion;
  /** @default "positive" */
  color?: LogoColor;
  /** Altura en px. El ancho sale de la proporción oficial. Avisa por consola si queda por debajo del mínimo. @default 32 */
  height?: number;
  /** Añade el área de seguridad oficial (2x lockups, 1x icono) como padding. @default false */
  clearSpace?: boolean;
  /** @default "Dialo" */
  title?: string;
  className?: string;
  style?: CSSProperties;
}
export interface SloganProps {
  /** Elemento HTML. El texto es fijo: "El agente que convierte conversaciones en resultados." @default "p" */
  as?: string;
  className?: string;
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = una por vista · secondary · ghost · danger (destructivas). @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** sm 32 px · md 40 px · lg 48 px. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icono Lucide a la izquierda. Sin children = botón de icono (requiere aria-label). */
  icon?: ReactNode;
  iconRight?: ReactNode;
  /** Pinta el icono en magenta: solo en la acción principal de la vista. @default false */
  accentIcon?: boolean;
  block?: boolean;
  /** Muestra spinner, deshabilita y marca aria-busy. */
  loading?: boolean;
  /** Renderiza otro elemento, p. ej. "a". @default "button" */
  as?: string;
  href?: string;
  children?: ReactNode;
}
export interface FieldProps {
  label?: ReactNode;
  /** Ayuda bajo el control. */
  hint?: ReactNode;
  /** Mensaje de error: marca aria-invalid y sustituye a hint. */
  error?: ReactNode;
  id?: string;
  /** Un único control: Input, Textarea o Select. */
  children: ReactElement;
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { children?: ReactNode }
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> { label?: ReactNode }
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> { label?: ReactNode }
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}
export interface BadgeProps {
  /** neutral · brand (azul) · accent (magenta, novedades y en vivo) · success · warning · danger. @default "neutral" */
  tone?: "neutral" | "brand" | "accent" | "success" | "warning" | "danger";
  dot?: boolean;
  /** Punto animado "en vivo". */
  live?: boolean;
  children?: ReactNode;
  className?: string;
}
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estado seleccionado (filtros). */
  pressed?: boolean;
  children?: ReactNode;
}
export interface CardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** surface = gris sin sombra · brand = azul Dialo con texto blanco. */
  variant?: "surface" | "brand";
  /** Hover: sube 2 px y gana sombra. */
  interactive?: boolean;
  as?: string;
  className?: string;
  /** Texto (se envuelve en párrafo) o contenido libre. */
  children?: ReactNode;
}
export interface TabsProps {
  items: { value: string; label: ReactNode }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** aria-label del tablist. @default "Secciones" */
  label?: string;
}
export interface AlertProps {
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  children?: ReactNode;
}
export interface IconProps {
  /** Atributo d de un path Lucide (24×24, trazo 2). */
  d: string;
  size?: number;
  className?: string;
}
export interface AvatarProps {
  src?: string;
  /** Nombre: genera iniciales y aria-label. */
  name?: string;
  /** sm 32 · md 40 · lg 56. @default "md" */
  size?: "sm" | "md" | "lg";
}
export interface AgentAvatarProps {
  /** @default "sm" */
  size?: "sm" | "md" | "lg";
}
export interface ThreadProps { children?: ReactNode; className?: string }
export interface MessageProps {
  /** agent = Dialo (izquierda, con avatar del icono) · customer = cliente (derecha, azul). @default "agent" */
  from?: "agent" | "customer";
  /** Hora, p. ej. "09:12". */
  time?: string;
  /** Muestra el avatar del agente. @default true */
  avatar?: boolean;
  children?: ReactNode;
}
export interface QuickRepliesProps {
  /** 2–3 opciones de 1–3 palabras, verbo + objeto. */
  options: string[];
  onSelect?: (option: string) => void;
}
export interface TypingProps {}
export interface ComposerProps {
  /** @default "Escribe un mensaje" */
  placeholder?: string;
  onSend?: (text: string) => void;
  /** @default "Enviar mensaje" */
  sendLabel?: string;
}
export interface OrderCardProps {
  title: ReactNode;
  meta?: ReactNode;
  /** Importe; se muestra en Geist Mono. */
  amount: ReactNode;
}
export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  /** Variación, p. ej. "+18 %". */
  delta?: ReactNode;
  /** @default "success" */
  deltaTone?: "success" | "danger" | "warning" | "neutral";
  /** Periodo o comparación: toda cifra lleva contexto. */
  context?: ReactNode;
}
export interface EmptyStateProps {
  title: ReactNode;
  children?: ReactNode;
  /** Un botón primario. */
  action?: ReactNode;
  /** URL del render oficial del personaje. */
  art?: string;
}
export interface ToastProps { children?: ReactNode; icon?: ReactNode }

export declare const Logo: FC<LogoProps>;
export declare const Slogan: FC<SloganProps>;
export declare const SLOGAN: "El agente que convierte conversaciones en resultados.";
export declare const Button: FC<ButtonProps>;
export declare const Field: FC<FieldProps>;
export declare const Input: FC<InputProps>;
export declare const Textarea: FC<TextareaProps>;
export declare const Select: FC<SelectProps>;
export declare const Checkbox: FC<CheckboxProps>;
export declare const Radio: FC<RadioProps>;
export declare const Switch: FC<SwitchProps>;
export declare const Badge: FC<BadgeProps>;
export declare const Chip: FC<ChipProps>;
export declare const Card: FC<CardProps>;
export declare const Tabs: FC<TabsProps>;
export declare const Alert: FC<AlertProps>;
export declare const Icon: FC<IconProps>;
export declare const Avatar: FC<AvatarProps>;
export declare const AgentAvatar: FC<AgentAvatarProps>;
export declare const Thread: FC<ThreadProps>;
export declare const Message: FC<MessageProps>;
export declare const QuickReplies: FC<QuickRepliesProps>;
export declare const Typing: FC<TypingProps>;
export declare const Composer: FC<ComposerProps>;
export declare const OrderCard: FC<OrderCardProps>;
export declare const Stat: FC<StatProps>;
export declare const EmptyState: FC<EmptyStateProps>;
export declare const Toast: FC<ToastProps>;
export declare const LOGO_VARIANTS: string[];
