import { CSSObject } from "@emotion/react";
import { colors } from "../../../styles";

export const cssOverlay: CSSObject = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 1, 0.52)',
  zIndex: '11',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 0.75rem',
}

export const cssOverlayText: CSSObject = {
  fontFamily: 'Axiforma',
  fontWeight: '600',
  fontSize: '1rem',
  textAlign: 'center',
  color: colors.white,
}
