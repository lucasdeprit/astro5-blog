---
title: Tipos de datos deterministas
author: Lucas Deprit
readtime: 10
date: 11-01-2025
description: Este es un blog en el que trataremos los tipos de datos no deterministas y como podemos resolver esto en rust
finished: false
---
Siempre hemos tenido el pensamiento de que los ordenadores son calculadoras exactas. Esto es hasta que te adentras en el mundo de la programación y pruebas operaciones simples con decimales.  

**Ejemplo:**  
```
0.1 + 0.2 = 0.30000000000000004
```

Los números de coma flotante han sido un problema común durante décadas en el mundo de la programación.  

Para resumir, las comas flotantes son **no deterministas**, es decir, dependiendo de la arquitectura en la que se ejecute tu programa, al calcular un número de coma flotante, este se resolverá con diferentes resultados dependiendo de si estamos en un sistema de 32 bits o 64 bits.  

---  

### ¿Por qué se produce esto?  

Los ordenadores representan los números en binario:  


**Ejemplo:**  

- Lo que valdría cada número (potencias de 2):  
  | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |  
  |------|-----|-----|-----|---|---|---|---|  

- Representación en binario:  
  |1|0|1|0|1|1|0|1|  
  |------|-----|-----|-----|---|---|---|---|  
  |128|0|32|0|8|4|0|1|  

- **Resultado:** *10101101 = 174*



#### ¿Pero qué pasa cuando tenemos que representar números decimales?  

En programación, los números decimales se representan mediante el estándar **IEEE 754**. El valor de un número en punto flotante se calcula con la siguiente fórmula:  

<div style="background-color: #1e1e1e; padding: 10px; border-radius: 5px; font-family: 'Courier New', monospace; font-size: 16px;">
  <strong style="color: #f4f4f4;">Fórmula:</strong><br>
  <span style="display: block; white-space: nowrap; color: #f4f4f4;">
    Número = (-1)<sup style="color: #f4f4f4;">signo</sup> × mantisa × 2<sup style="color: #f4f4f4;">exponente</sup>
  </span>
</div>

Donde:  
- **Signo:** Determina si el número es positivo (0) o negativo (1).  
- **Exponente:** Define la escala del número.  
- **Mantisa (o significando):** Contiene los dígitos significativos del número en binario.  

[Explicación mucho mejor que la que yo puedo dar, aquí](https://youtu.be/bbkcEiUjehk?si=XTo3-ybv3KpYfj_c)  

---

## ⚠️ **Work In Progress (WIP)** ⚠️

Este artículo está en proceso de desarrollo y seguirá siendo actualizado.

---

