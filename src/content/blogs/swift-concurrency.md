---
title: 🚀 Concurrencia en Swift 
author: Lucas Deprit
readtime: 20
date: 17-02-2025
description: Resumen de la evolución de concurrencia en Swift. Task, Actors & async/await..
finished: true
---

# 🚀 Concurrencia en Swift: Seguridad y Evolución

El nuevo sistema de concurrencia de Swift busca garantizar que los programas que utilicen concurrencia asíncrona estén **libres de condiciones de carrera**. Esto permite que nuestras aplicaciones sean más seguras, estables y eficientes.

---

## 🧐 ¿Qué es una condición de carrera?

Una **condición de carrera** (*data race*) ocurre cuando **dos hilos acceden concurrentemente a una misma ubicación en memoria compartida**, y al menos uno de ellos intenta modificar su valor.

### 🔴 Problemas causados por las condiciones de carrera:
- **Inestabilidad y crashes**: Un hilo puede leer datos corruptos si otro los modifica al mismo tiempo.
- **Resultados inconsistentes**: Dependiendo del orden en que se ejecuten los hilos, el programa puede producir distintos resultados en cada ejecución.
- **Difícil depuración**: Son errores difíciles de reproducir, ya que dependen de la velocidad y el orden de ejecución de los hilos.

Para solucionar esto, Swift ha evolucionado incorporando **herramientas seguras para la concurrencia**, como actors y tasks.

---

## 🛠️ Evolución del modelo de concurrencia en Swift

Swift ha mejorado su modelo de concurrencia con el objetivo de **proteger la memoria compartida** y permitir a los desarrolladores gestionar la concurrencia de manera más sencilla.

### 💡 Principales herramientas de concurrencia en Swift:
1. **Task y Task.detached** → Para manejar tareas asíncronas.
2. **Actores (actor)** → Aíslan el estado para evitar condiciones de carrera.
3. **@MainActor** → Garantiza que un código se ejecute en el hilo principal.
4. **async/await** → Simplifica la ejecución de código asíncrono.

---

## 🏠 **Actores en Swift: Contextos Aislados**

Los **actores (actor)** son un tipo especial de objeto que **aíslan métodos y propiedades**. Esto significa que **solo una tarea o hilo puede interactuar con el estado de un actor a la vez**, evitando así las condiciones de carrera.

### 📌 **Uso de @MainActor**

Cuando marcamos una clase con @MainActor, nos aseguramos de que **sus propiedades y métodos solo se accedan desde el hilo principal** de la aplicación. Esto es clave para evitar errores en la interfaz de usuario, donde la manipulación de datos en otros hilos podría causar problemas.

#### ✅ **Ejemplo: Uso de @MainActor en un ViewModel**

```swift
@MainActor
class ViewModel {
    var name: String = "Swift"
    
    func updateName() {
        Task {
            self.name = "Updated Swift"  // ✅ Seguro: ejecutado en el contexto del MainActor.
        }
    }
}
```

En este caso, @MainActor garantiza que `name` **siempre se actualice en el hilo principal**, evitando problemas de concurrencia con la UI.

---

## 🚀 **Contextos No-Aislados: Task.detached**

A diferencia de Task, que hereda el contexto en el que se ejecuta, Task.detached **se ejecuta en un contexto completamente separado** y no hereda el actor en el que fue creado.

### 🔥 **Ejemplo: Task.detached en acción**

```swift
actor DataManager {
    var value: Int = 0
    
    func updateValue() {
        Task.detached {
            self.value += 1  // ❌ Error: Intentando modificar un actor desde un contexto no aislado
        }
    }
}
```

🔴 **Error**: Un Task.detached no puede acceder directamente a un actor, ya que no respeta sus reglas de aislamiento.  
👉 **Solución**: Debemos llamar explícitamente al actor usando await:

```swift
actor DataManager {
    var value: Int = 0
    
    func updateValue() {
        Task.detached {
            await self.incrementValue()
        }
    }
    
    private func incrementValue() {
        value += 1
    }
}
```

---

## 🎯 **Uso de async/await**

El modelo **async/await** de Swift se utiliza para escribir código asíncrono de manera más legible y sencilla. Permite ejecutar tareas en segundo plano y esperar su resultado sin bloquear el hilo principal.

### ✅ **Ejemplo: Uso de async/await**

```swift
func fetchData() async -> String {
    // Simula una tarea asincrónica como una llamada a API
    return "Data from network"
}

func processData() async {
    let data = await fetchData()  // Espera la respuesta de fetchData()
    print(data)
}
```

En este caso, la función `fetchData` es asíncrona y se puede esperar usando `await` para obtener el resultado antes de continuar con la ejecución de la función `processData`.

---

## 🎯 **TaskGroup**

`TaskGroup` permite manejar un conjunto de tareas de forma concurrente. Esto es útil cuando necesitas ejecutar múltiples tareas en paralelo y luego esperar a que todas terminen.

### ✅ **Ejemplo: TaskGroup**

```swift
func fetchMultipleData() async {
    await withTaskGroup(of: String.self) { group in
        group.addTask {
            return "Data 1"
        }
        
        group.addTask {
            return "Data 2"
        }
        
        for await result in group {
            print(result)  // Imprime "Data 1", "Data 2"
        }
    }
}
```

En este ejemplo, `TaskGroup` maneja dos tareas de manera concurrente. Cada tarea devuelve un valor, y el grupo espera a que ambas finalicen.

---

## 🎯 **@ActorIsolated**

`@ActorIsolated` es un atributo que garantiza que las propiedades de un actor sean accesibles solo dentro de su propio contexto. Esto refuerza el aislamiento y previene el acceso desde fuera del actor, mejorando la seguridad.

### ✅ **Ejemplo: @ActorIsolated**

```swift
actor Database {
    @ActorIsolated var data: [String] = []
    
    func addData(_ newData: String) {
        data.append(newData)
    }
    
    func getData() -> [String] {
        return data
    }
}
```

En este caso, la propiedad `data` está protegida con `@ActorIsolated`, lo que impide que otros hilos o tareas puedan modificarla directamente.

---

## 🎯 **withTaskGroup**

`withTaskGroup` es una función de alto nivel que ejecuta un conjunto de tareas en paralelo y espera a que todas finalicen antes de continuar.

### ✅ **Ejemplo: withTaskGroup**

```swift
func fetchData() async {
    await withTaskGroup(of: String.self) { group in
        group.addTask {
            return "Data 1"
        }
        
        group.addTask {
            return "Data 2"
        }
        
        // Obtener los resultados a medida que se completan las tareas
        for await result in group {
            print(result)
        }
    }
}
```

Este enfoque es útil cuando tienes varias tareas asíncronas que necesitan ejecutarse en paralelo, pero quieres manejar sus resultados de manera sencilla.

---

## 🎯 **Actor**

Un **actor** es un tipo especial de objeto que aísla su estado y garantiza que solo una tarea o hilo pueda modificar sus propiedades a la vez. Esto es útil para evitar condiciones de carrera.

### ✅ **Ejemplo: Uso de un actor**

```swift
actor DataManager {
    var value: Int = 0
    
    func increment() {
        value += 1
    }
}
```

Aquí, el actor `DataManager` garantiza que solo una tarea o hilo puede modificar su propiedad `value` a la vez, evitando así problemas de concurrencia.

---

## 🎯 **Conclusión**

Swift ha evolucionado para ofrecer herramientas que garantizan una concurrencia más **segura y eficiente**.  
Gracias a actors, Task, y @MainActor, podemos escribir código **libre de condiciones de carrera**, asegurando que nuestras aplicaciones sean más **estables y predecibles**.

### ✅ **Puntos clave**
- **Evitar condiciones de carrera** con el uso de **actores**.
- **Gestionar tareas concurrentes** con Task y Task.detached.
- **Garantizar ejecución en el hilo principal** con @MainActor.
- **Usar async/await** para hacer código más legible y seguro.

