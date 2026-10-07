<template>
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      d="M50 96 C47 84 45 76 41 71 C31 77 15 79 6 67 C16 62 22 57 23 51 C11 47 2 35 6 22 C18 25 28 30 35 35 C32 23 34 11 44 4 C49 13 50 22 50 31 C51 22 52 13 57 4 C67 11 69 23 66 35 C73 30 83 25 95 22 C98 35 90 47 78 51 C79 57 85 62 95 67 C86 79 70 77 60 71 C56 76 53 84 50 96 Z"
      :fill="dark ? '#2f7a34' : '#3f8f3a'"
    />
    <path
      d="M50 92 L50 31 M50 62 L23 51 M50 62 L78 51 M50 74 L18 66 M50 74 L82 66 M50 48 L36 30 M50 48 L64 30"
      stroke="#9fd27f"
      stroke-width="1.6"
      stroke-linecap="round"
      fill="none"
      opacity="0.7"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ dark?: boolean }>()
</script>
