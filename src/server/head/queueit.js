export default state => {
    return (state.auth.get('isAuthenticated', false)) ? `` : `<script type="text/javascript" src="https://static.queue-it.net/script/queueclient.min.js"></script>
    <script 
        data-queueit-c="gousto" 
        type="text/javascript" 
        src="https://static.queue-it.net/script/queueconfigloader.min.js">
    </script>`
}