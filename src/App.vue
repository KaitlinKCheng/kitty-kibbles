<template>
    <b-container
        id="app"
        class="my-2"
    >
        <b-navbar
            type="dark"
            variant="primary"
        >
            <b-navbar-nav>
                <b-navbar-brand to="/">
                    <fa-icon icon="fa-solid fa-cat" />
                    <span>&nbsp;Kitty Kibbles</span>
                </b-navbar-brand>
            </b-navbar-nav>
        </b-navbar>
        <router-view/>
    </b-container>
</template>

<style>
</style>
