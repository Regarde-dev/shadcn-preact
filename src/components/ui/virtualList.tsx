import { VNode } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";

interface VirtualListProps<T> {
  /** Array con todos los datos a mostrar. */
  items: T[];

  /**
   * Función que recibe un item y su índice,
   * y devuelve el VNode a renderizar.
   */
  renderItem: (item: T, index: number) => VNode;

  /** Altura fija (en px) de cada elemento de la lista. */
  itemHeight: number;

  /** Altura total del contenedor que mostrará la lista (en px). */
  height: number;

  /**
   * Número de items extra (por encima y por debajo)
   * que se renderizan como buffer para evitar render saltos.
   * Por defecto 2.
   */
  overscan?: number;
}

/**
 * Componente genérico de Lista Virtualizada (VirtualList).
 * @example
 *   <VirtualList
 *     items={["Item A", "Item B", "Item C", ...]}
 *     itemHeight={30}
 *     height={300}
 *     renderItem={(item, index) => <div>{index} - {item}</div>}
 *   />
 */
export function VirtualList<T>(props: VirtualListProps<T>) {
  const { items, renderItem, itemHeight, height, overscan = 2 } = props;

  // scrollTop actual del contenedor
  const [scrollTop, setScrollTop] = useState(0);

  // Cuando se hace scroll, actualizamos el scrollTop
  const onScroll = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // Cantidad de items que caben de forma visible dentro de `height`
  const visibleCount = useMemo(() => Math.ceil(height / itemHeight), [height, itemHeight]);

  // Índice de inicio y fin, aplicando un overscan
  const startIndex = useMemo(() => Math.floor(scrollTop / itemHeight), [scrollTop, itemHeight]);
  const endIndex = useMemo(
    () => Math.min(items.length, startIndex + visibleCount + overscan),
    [items, startIndex, visibleCount, overscan]
  );

  // Limitamos el startIndex a 0 y el endIndex al total de items
  const safeStartIndex = Math.max(0, startIndex - overscan);
  const safeEndIndex = Math.min(items.length, endIndex);

  // Sección de items que vamos a renderizar
  const visibleItems = useMemo(() => items.slice(safeStartIndex, safeEndIndex), [items, safeStartIndex, safeEndIndex]);

  return (
    <div
      style={{
        position: "relative",
        overflowY: "auto",
        height: `${height}px`,
      }}
      onScroll={onScroll}
    >
      {/**
       * Este contenedor "espaciador" se usa para que el scroll
       * represente el total de la lista.
       */}
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: "relative",
        }}
      >
        {visibleItems.map((item, i) => {
          const actualIndex = safeStartIndex + i;
          // Calculamos la posición vertical
          const top = actualIndex * itemHeight;
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: `${top}px`,
                height: `${itemHeight}px`,
                width: "100%",
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
