import React from 'react';

export enum TabId {
  Problem = 'problem',
  Solution = 'solution',
  Mechanics = 'mechanics',
  Benefits = 'benefits',
  Types = 'types',
  Quiz = 'quiz',
}

export interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

export enum CacheStatus {
  Empty = 'EMPTY',
  Cached = 'CACHED',
}

export enum TrafficScenario {
  NoCDN = 'NO_CDN',
  WithCDN = 'WITH_CDN',
}