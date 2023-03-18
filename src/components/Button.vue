<template>
    <div>
        <button class="button"><slot></slot></button>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.button {
    padding: 10px 15px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    border: none;
    outline: none;
    cursor: pointer;
}
</style>
