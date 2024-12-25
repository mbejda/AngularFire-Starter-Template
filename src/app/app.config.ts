import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import {environment} from '../environments/environment';
import Aura from '@primeng/themes/aura';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {definePreset} from '@primeng/themes';


const MyPreset = definePreset(Aura, {
  semantic: {
    typography: {
      fontFamily: {
        base: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', system-ui, ui-sans-serif, Helvetica, 'Apple Color Emoji', sans-serif",
        display: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif",
        code: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
      },
      fontSize: {
        xs: "0.75rem",     // 12px
        sm: "0.875rem",    // 14px
        base: "1rem",      // 16px
        lg: "1.125rem",    // 18px
        xl: "1.25rem",     // 20px
        "2xl": "1.5rem",   // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem"   // 36px
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700"
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2"
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em"
      }
    },
    text: {
      heading: {
        fontFamily: "{typography.fontFamily.display}",
        fontWeight: "{typography.fontWeight.semibold}",
        lineHeight: "{typography.lineHeight.tight}",
        letterSpacing: "{typography.letterSpacing.tight}"
      },
      body: {
        fontFamily: "{typography.fontFamily.base}",
        fontWeight: "{typography.fontWeight.normal}",
        lineHeight: "{typography.lineHeight.normal}",
        letterSpacing: "{typography.letterSpacing.normal}"
      },
      code: {
        fontFamily: "{typography.fontFamily.code}",
        fontWeight: "{typography.fontWeight.normal}",
        lineHeight: "{typography.lineHeight.normal}",
        letterSpacing: "{typography.letterSpacing.normal}"
      }
    },
    transitionDuration: "0.2s",
    focusRing: {
      width: "2px",
      style: "solid",
      color: "{primary.color}",
      offset: "2px",
      shadow: "0 0 0 2px rgba(24, 119, 242, 0.15), 0 4px 12px rgba(24, 119, 242, 0.1)"
    },
    disabledOpacity: "0.4",
    iconSize: "1.25rem",
    anchorGutter: "2px",
    primary: {
      50: "#f5f9ff",
      100: "#e7f1ff",
      200: "#c4ddff",
      300: "#90c1ff",
      400: "#589eff",
      500: "#1877f2", // Facebook Blue
      600: "#0c63d4",
      700: "#0854b5",
      800: "#064696",
      900: "#043977",
      950: "#022555"
    },
    formField: {
      fontSize: "{typography.fontSize.base}",
      fontFamily: "{typography.fontFamily.base}",
      fontWeight: "{typography.fontWeight.normal}",
      lineHeight: "{typography.lineHeight.normal}",
      label: {
        fontSize: "{typography.fontSize.sm}",
        fontWeight: "{typography.fontWeight.medium}",
        letterSpacing: "{typography.letterSpacing.wide}"
      },
      helper: {
        fontSize: "{typography.fontSize.sm}",
        lineHeight: "{typography.lineHeight.snug}"
      }
    },
    list: {
      padding: "0.5rem",
      gap: "2px",
      header: {
        padding: "0.5rem 0.75rem"
      },
      option: {
        padding: "0.5rem 0.75rem",
        borderRadius: "0.5rem"
      },
      optionGroup: {
        padding: "0.5rem 0.75rem",
        fontWeight: "600"
      }
    },
    content: {
      borderRadius: "0.75rem"
    },
    overlay: {
      select: {
        borderRadius: "0.75rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      },
      popover: {
        borderRadius: "0.75rem",
        padding: "0.75rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      },
      modal: {
        borderRadius: "1rem",
        padding: "1.25rem",
        shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        header: {
          padding: "1.25rem",
          background: "transparent",
          borderColor: "{surface.200}"
        },
        body: {
          padding: "1.25rem"
        },
        footer: {
          padding: "1.25rem",
          background: "{surface.50}",
          borderColor: "{surface.200}"
        }
      },
      navigation: {
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }
    },
    colorScheme: {
      light: {

        formField: {
          background: "#ffffff",
          disabledBackground: "#f0f2f5",
          filledBackground: "#f0f2f5",
          filledHoverBackground: "#e4e6eb",
          filledFocusBackground: "#ffffff",
          color: "#050505",
          disabledColor: "#65676b",
          placeholderColor: "#65676b",
          invalidPlaceholderColor: "#dc3545",
          floatLabelColor: "#65676b",
          floatLabelFocusColor: "#1877f2",
          floatLabelActiveColor: "#65676b",
          floatLabelInvalidColor: "#dc3545",
          iconColor: "#65676b",
          shadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
          hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)",
          focusShadow: "0 2px 4px rgba(24, 119, 242, 0.05), 0 4px 12px rgba(24, 119, 242, 0.1)",
          borderColor: "#dddfe2",
          hoverBorderColor: "#ccd0d5",
          focusBorderColor: "#1877f2",
          invalidBorderColor: "#dc3545"
        },
        checkbox: {
          shadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          focusShadow: "0 0 0 2px rgba(24, 119, 242, 0.15), 0 2px 4px rgba(24, 119, 242, 0.1)"
        },
        select: {
          shadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
          hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)",
          focusShadow: "0 2px 4px rgba(24, 119, 242, 0.05), 0 4px 12px rgba(24, 119, 242, 0.1)",
          menuShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }
      },
      dark: {
        surface: {
          0: "#242526",
          50: "#3a3b3c",
          100: "#4e4f50",
          200: "#606770",
          300: "#8d949e",
          400: "#b0b3b8",
          500: "#e4e6eb",
          600: "#f0f2f5",
          700: "#ffffff",
          800: "#ffffff",
          900: "#ffffff",
          950: "#ffffff"
        },
        formField: {
          background: "#242526",
          shadow: "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.3)",
          hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3)",
          focusShadow: "0 2px 4px rgba(45, 136, 255, 0.1), 0 4px 12px rgba(45, 136, 255, 0.2)"
        },
        checkbox: {
          shadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          focusShadow: "0 0 0 2px rgba(45, 136, 255, 0.2), 0 2px 4px rgba(45, 136, 255, 0.2)"
        },
        select: {
          shadow: "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.3)",
          hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3)",
          focusShadow: "0 2px 4px rgba(45, 136, 255, 0.1), 0 4px 12px rgba(45, 136, 255, 0.2)",
          menuShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"
        }
      }
    },
    card: {
      title: {
        fontFamily: "{typography.fontFamily.display}",
        fontSize: "{typography.fontSize.xl}",
        fontWeight: "{typography.fontWeight.semibold}",
        lineHeight: "{typography.lineHeight.tight}"
      },
      subtitle: {
        fontSize: "{typography.fontSize.base}",
        fontWeight: "{typography.fontWeight.normal}",
        lineHeight: "{typography.lineHeight.normal}",
        letterSpacing: "{typography.letterSpacing.wide}"
      }
    },
    button: {
      fontFamily: "{typography.fontFamily.base}",
      fontWeight: "{typography.fontWeight.medium}",
      letterSpacing: "{typography.letterSpacing.wide}",
      sm: {
        fontSize: "{typography.fontSize.sm}"
      },
      md: {
        fontSize: "{typography.fontSize.base}"
      },
      lg: {
        fontSize: "{typography.fontSize.lg}"
      }
    },
  }
});





export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'light',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())]
};
