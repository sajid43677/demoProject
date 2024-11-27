<template>
    <div class="form-container">
        <div class="form-wrapper">
            <h1>Login</h1>
            <div class="form-phone">
                <label for="phone">Phone</label>
                <input type="text" id="phone" v-model="phone" />
            </div>
            <div class="form-Otp">
                <label for="otp">Otp</label>
                <input type="number" id="otp" v-model="otp" />
            </div>
            <button @click="login">Login</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, inject } from 'vue';
    import { useCookie } from '#app';

    const token = useCookie('auth_token');
    const isAuth = inject('isAuth') as Ref<boolean>;

    const phone = ref('');
    const otp = ref('');

    async function login() {
        const url = 'https://vitalac.nop-station.com/api/customer/verifysigninotp';
        const body = {
        data: {
            customProperties: {
                additionalProp1: 'string',
                additionalProp2: 'string',
                additionalProp3: 'string',
            },
                phone: phone.value,
                otp: otp.value,
                otpLength: 0,
                otpExpiresInSeconds: 0,
                canResendInSeconds: 0,
        },
        formValues: [
            {
                key: 'string',
                value: 'string',
            },
        ],
        uploadPicture: {
            base64Image: 'string',
            fileName: 'string',
            contentType: 'string',
            lengthInBytes: 0,
        },
        };
        try {
        const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': "*/*",
                    'DeviceId': '43023dbb-c665-49be-8be7-eb5d6c87cb50',
                    'Content-Type': 'application/json-patch+json', 
                },
                body: JSON.stringify(body),
            });
            
            console.log(response);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            let data = await response.json();
            data = data.Data;
            console.log(data);
            if (data?.Token) {
                token.value = data.Token; // Save token in cookie
                isAuth.value = true;
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


</script>