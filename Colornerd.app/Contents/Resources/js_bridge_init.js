(function() {
    function _Bridge() {
        var lastDockBadge = null;
        var notificationCount = 0;
    
        Object.defineProperty(this, 'dockBadge', {
            get() {
                return lastDockBadge;
            },
            set(val) {
                lastDockBadge = val;
                window.webkit.messageHandlers.fluid_setDockBadge.postMessage({'value': val});
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'notificationCount', {
            get() {
                return ++notificationCount;
            },
            enumerable: false
        });
        
        this.requestUserAttention = function(critical) {
            window.webkit.messageHandlers.fluid_requestUserAttention.postMessage({'critical': critical});
        };

        this.beep = function() {
            window.webkit.messageHandlers.fluid_beep.postMessage({});
        };

        this.playSound = function(name) {
            window.webkit.messageHandlers.fluid_playSound.postMessage({'name': name});
        };

        this.log = function(message) {
            window.webkit.messageHandlers.fluid_log.postMessage({'message': message});
        };
 
        this.showUserNotification = function(args) {
            var id = "" + window.fluid.notificationCount;
            args = args ? args : {};
            args['id'] = id;
            window.webkit.messageHandlers.fluid_showUserNotification.postMessage({'args': args});
        };
 
        this.resourcePath = "";
        this.userscriptPath = "";
        this.applicationPath = "";
    };

    window.fluid = new _Bridge();
})();

function Notification(title, args) {
    this.addEventListener = function() {};

    var id = "" + window.fluid.notificationCount;
    args = args ? args : {};
    args['id'] = id;
    args['title'] = title;
    window.webkit.messageHandlers.fluid_Notification.postMessage({'args': args});
}
Notification.permission = '%@';

Notification.requestPermission = function(cb) {
    window.webkit.messageHandlers.fluid_Notification_requestPermission.postMessage({});
    window.fluid.callback = cb;
};

