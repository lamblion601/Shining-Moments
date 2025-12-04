import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  style,
  color,
}) => {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        color && { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System', // 시스템 기본 폰트 또는 커스텀 폰트
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: '#2D3748',
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: '#2D3748',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: '#2D3748',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#4A5568',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#718096',
  },
});




