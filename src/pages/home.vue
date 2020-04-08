<template>
    <div>
        home
        <gld-button text="haha"></gld-button>
    </div>
</template>
<script>
import gldButton from 'components/index';
export default {
    mounted() {
        console.log('gldButton', gldButton);
    },
    components: {
        gldButton
    }
}
</script>