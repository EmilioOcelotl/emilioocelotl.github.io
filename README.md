# emilioocelotl.github.io

## Despliegue

Para instalar:

`npm install`

Para probar localmente:  

`npm start`

Para construir: 

`npm run build`

## Radio

Algunas referencias para montar una radio por internet se pueden encontrar en: [web-radio](https://0xacab.org/ocelotl/web-radio)

## Configuración en NGINX para Single Page Applications (SPA)

``
    # Configuración SPA - Todas las rutas van a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Manejo correcto de archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # Otras configuraciones de seguridad y rendimiento
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    access_log /var/log/nginx/mipagina.com.access.log;
    error_log /var/log/nginx/mipagin.com.error.log;
}
``

## Pendientes

- Mover página personal a un subdominio para activar las subpáginas anteriores y que esto no afecte a todas las carpetas del proyecto. Ej: ocelotl.cc/trilium 
