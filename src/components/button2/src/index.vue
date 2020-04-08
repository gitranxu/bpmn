<template>
    <div class="gld-btn">
        {{text}}
    </div>
</template>
<script>
export default {
    name: 'gldButton2',
    props: {
        text: {
            type: String,
            default() {
                return '这是按钮2';
            }
        }
    }
}
</script>
<style lang="sass">
.gld-btn{
    padding: 10px;
    background: #fe3af1;
    cursor: pointer;
    text-align: center;
    &:hover{
        background: #a3f411;
    }
}
</style>