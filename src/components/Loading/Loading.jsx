import React from 'react';
import Style from './LoadingStyle';

export default function Loading() {
  return (
    <Style>
      <main>
        Loading
        <div id="dot1">.</div>
        <div id="dot2">.</div>
        <div id="dot3" >.</div>
      </main>
    </Style>
  );
}