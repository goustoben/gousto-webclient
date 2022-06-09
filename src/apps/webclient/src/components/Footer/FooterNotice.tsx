import React from 'react'
import { Box, Text, TextAlign } from '@gousto-internal/citrus-react'

interface Props {
  id: string
  children: React.ReactNode
}

export const FooterNotice = ({ id, children }: Props) => (
    <Box
      id={id}
      paddingH={[3, 8, 8, 8]}
      paddingV={0}
      paddingBottom={4}
      maxWidth={["100%", "60rem", "60rem","60rem"]}
      style={{ margin: 'auto' }}
    >
      <Text size={1} textAlign={TextAlign.Center}>{children}</Text>
    </Box>
)
