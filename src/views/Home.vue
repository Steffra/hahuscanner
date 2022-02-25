<script lang="ts">
    import { ref, defineComponent } from 'vue'
    import { useFetch } from '@vueuse/core'
    import { parse } from 'node-html-parser'
    import { log } from 'console'

    export default defineComponent({
        setup() {
            const URL = ref(
                'https://www.hasznaltauto.hu/talalatilista/PCOG2VG3N3NTADH5C574AEGHJHN2TDZLQIKRRAQCAP5GVMBR4MUJNRCASKGSMRP7PWKOZLESDO7ZRYHVSA6BJCHKIF6DQUJOIXIYDR4WVSCC2DWFEPVUUUNYBNVFIZ7IHVC5KSQUUBZMP3PEHKQEOBNW23JAJV4FFCFLSBO6QPVF4FHFOII352FQCYC7NNWOYK33ODBBXIIVK5KX72UFNC77L446COUAXMMFBPR6QLKX2TGNQXRJ6K5WMDA6YJBI5FXDQLCDU6QMRXFQGGGDPNFIB3UOTBRZKSLLMYMQN2AIMMIUR5XWFEKZNABUOD2HTD5OFSPMXER7M7LO5BVX5EZODFAKUDGNN7D6CWLUXXZC4VFPDDCTJRUHHGHF7TXOX4TMTU7ZJUNP7IQ54QHF3OVBOF3C7B5TEXZSUG5EVG7ZQ56JYKXHPHXUD7U7ZCZFJVPJE6LOSIGHOMOB5PZTMDJMP6FEFOUNDUB2K2JXKJ43J2PMDCZANW2BFWNWWM2VCUSA5VOUUBJJHBIRS3V5LQYU4PS2S52HKQZZNYOAZMAX7ZI7Y4YMTVW7VQRQPI5VLRGHJ3HEEB6Z5EAZWFT5E6675FSCHGPWXIJENW7TTGADSQ23HQBLP5ZBI4DMIPR7MMEVACSO4SBX3HO3UUUEO6IZ4TSSQV2BVZDHSFPE2UUK6Y56SJDXKQGTULW22T7A4XVCXPWQHYJZBOU2HGXGDVTFV7IOC5YTG7CSGVVIF7KMLJVK6BGPB5GDKOQMCQ52NN3CNZZODWPUTF7K54BAK2BP34ZWFMAWCV3D44GJ2XYKMIALBI2VJT6EG4ZFKM4HHMSTLTAI4RIZ6AU6VRBDZZ6A6RFUPZR4UQ3B4EN22MGPYQEGBZSKTTNS6DLDQB42GO5HUT5WAWSTGRHX4PF4N36KXQ635BX2CTX2SHXSQP5BZV6BBZH3J2ZVTICPRZZ7FZ33JFA'
            )

            const showNotification = (listing) => {
                console.log(listing)
                const notification = new Notification('New car for sale!', {
                    body: 'A new car has been listed for sale according to the search criteria you have set.',
                    icon: 'img/en.png',
                })
                notification.onclick = (e) => {
                    window.open(listing.url, '_blank')
                }
            }

            if (Notification.permission === 'granted') {
                console.log('notification_permission_granted')
            }
            Notification.requestPermission().then((permission) => {
                console.log(permission)
            })

            const getDataFromElement = (html: any) => {
                const url: string = html.querySelector('h3 a').getAttribute('href')!
                const title: string = html.querySelector('h3 a').textContent!
                const price: number = html.nextElementSibling.querySelector('div .vetelar').textContent.replace(/\s/g, '').replace('Ft', '')
                const id: number = parseInt(url.split('-').pop()!)
                return { id, title, price, url }
            }

            const fetchData = (isPop: boolean) => {
                const { data, onFetchResponse } = useFetch(URL.value).get().text()
                onFetchResponse(() => {
                    const parser = new DOMParser()
                    const htmlDoc = parser.parseFromString(data.value!, 'text/html')
                    const entries: any = []
                    htmlDoc.querySelectorAll('.cim-kontener').forEach((element) => {
                        entries.push(getDataFromElement(element))
                    })
                    if (isPop) {
                        entries.pop()
                        entries.pop()
                    }
                    const knownEntries = JSON.parse(localStorage.getItem('entries')!) || []
                    const newEntries = entries.filter((entry) => !knownEntries.find((knownEntry) => knownEntry.id === entry.id))
                    if (newEntries.length) {
                        newEntries.forEach((listing) => {
                            showNotification(listing)
                        })
                    }

                    localStorage.setItem('entries', JSON.stringify(entries))
                })
            }
            const poll = (interval: number) => {
                setInterval(() => {
                    fetchData(false)
                }, interval)
            }
            return {
                URL,
                poll,
                fetchData,
            }
        },
    })
</script>

<template>
    <div class="">
        <input
            v-model="URL"
            style="width: 100%"
            class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
            "
            type="text"
        />
        <button
            @click="
                fetchData(true)
                fetchData(false)
                poll(60000)
            "
        >
            Start!
        </button>
    </div>
</template>
