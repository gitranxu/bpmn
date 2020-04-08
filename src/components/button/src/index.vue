<template>
    <div class="gld-btn">
        {{text}}
    </div>
</template>
<script>
export default {
    name: 'gldButton',
    props: {
        text: {
            type: String,
            default() {
                return '这是按钮';
            }
        }
    }
}
</script>
<style lang="sass">
.gld-btn{
    padding: 10px;
    background: #f43afe;
    cursor: pointer;
    text-align: center;
    &:hover{
        background: #3af4ef;
    }
}
</style>