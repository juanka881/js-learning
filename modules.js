(function($global, undefined) {

    var Module = function() {
        var self = this;

        self.export = function(ns, item) {

            if(item === undefined || item == null || item == '') {
                var msg = 'unable to export item, item is undefined/null/empty';
                throw new Error(msg);
            }

            var parts = ns.split('.');
            var parent = $global;
            var name = null;
            var len = parts.length;

            for (var i = 0; i < len - 1; i++) {
                name = parts[i];
                parent[name] = parent[name] || {};
                parent = parent[name];
            }

            var lastName = parts[parts.length - 1];
            parent[lastName] = item;
        }

        self.import = function(ns) {
            var parts = ns.split('.');
            var parent = $global;
            var name = null;
            var len = parts.length;
            var currentName = '';

            for (var i = 0; i < len; i++) {
                name = parts[i];                

                if(parent[name] === undefined) {
                    var msg = '';
                    if(i == 0)
                    {
                        var msg = 'unable to find object: \'' 
                        + name 
                        + '\''                         
                        + ' in {' + ns + '}';
                    }
                    else
                    {
                        var msg = 'unable to find object: \'' 
                        + name 
                        + '\' @ ' 
                        + currentName + '*'
                        + ' in {' + ns + '}';    
                    }
                    
                    throw new Error(msg);
                }
                else {
                    currentName = currentName + name + '.';
                    parent = parent[name];    
                }
            };

            return parent;
        }
    }

    $global.modules = new Module();
    $global.modules.export('system.app.window', $global);

})(window);