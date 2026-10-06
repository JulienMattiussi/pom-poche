<template>
  <svg viewBox="0 0 200 250" overflow="visible" role="img" aria-label="PomPoche">
    <g stroke-linejoin="round">
      <rect
        x="76"
        y="6"
        width="48"
        height="30"
        rx="8"
        fill="#fff"
        stroke="#fff"
        stroke-width="16"
      />
      <path :d="BOTTLE" fill="#fff" stroke="#fff" stroke-width="18" />
      <rect
        x="76"
        y="6"
        width="48"
        height="30"
        rx="8"
        class="fill-lime"
        stroke="var(--color-lime)"
        stroke-width="8"
      />
      <path :d="BOTTLE" fill="#fff" stroke="var(--color-lime)" stroke-width="9" />
    </g>
    <g class="font-logo" transform="rotate(-9 100 150)">
      <g stroke="#fff" stroke-width="12" stroke-linejoin="round" fill="#fff">
        <text v-for="line in LINES" :key="line.text" v-bind="line.attrs">{{ line.text }}</text>
      </g>
      <g class="fill-leaf" stroke="var(--color-leaf)" stroke-width="2.5" stroke-linejoin="round">
        <text v-for="line in LINES" :key="line.text" v-bind="line.attrs">{{ line.text }}</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
const BOTTLE =
  'M84 36 H116 V62 C116 80 182 84 182 124 V212 C182 232 166 244 146 244 H54 C34 244 18 232 18 212 V124 C18 84 84 80 84 62 Z'

const LINES = [
  { text: "Pom'", attrs: { x: 36, y: 140, 'font-size': 66 } },
  { text: 'Poche', attrs: { x: 100, y: 212, 'font-size': 62, 'text-anchor': 'middle' } },
]
</script>
