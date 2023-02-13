import * as React from "react";
import { Box, Text, NativeBaseProvider } from "native-base";
import Container from "./Container";

export default function App () {
  return (
    <NativeBaseProvider>
      <Container />
    </NativeBaseProvider>
  );
}