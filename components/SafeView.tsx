import { Platform, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { SafeViewProps } from '../types/types'

export const SafeView = ({ children, bgColor }: SafeViewProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bgColor ? bgColor : "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }}
    >
      { children }
    </SafeAreaView>
  )
}