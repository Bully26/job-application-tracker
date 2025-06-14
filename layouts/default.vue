<template>
  <div class="flex w-[100%] ">
    <NavBig></NavBig>
    <div class="flex grow">
          <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { NavBig, NavSmall } from '#components';



</script>