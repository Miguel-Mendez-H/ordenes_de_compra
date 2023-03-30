export default function adaptarMenus(respuesta) {
    if (!Array.isArray(respuesta)) {
        return {};
    }
    const titulosPrincipales = respuesta.filter(item => item.parent_id === null);

    const menus = titulosPrincipales.reduce((acumulador, titulo) => {
        const submenus = respuesta.filter(item => item.parent_id === titulo.id);
        acumulador.push({
          id: titulo.id,
          nombre: titulo.nombre,
          ruta: titulo.url,
          orden: titulo.orden_menus,
          submenus,
        });
        return acumulador;
      }, []);
      menus.sort((a, b) => a.orden - b.orden);
    
      return menus;
    }

