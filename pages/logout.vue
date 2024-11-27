<script setup lang="ts">
    import { useCookie } from '#app';
    import { useRouter } from 'vue-router';
    import {ref, inject} from 'vue';

    const isAuth = inject('isAuth') as Ref<boolean>;

    const token = useCookie('auth_token');
    const router = useRouter();
    const logout = () => {
        token.value = '';
        isAuth.value = false;
        router.push('/login');
    };
    logout();
</script>