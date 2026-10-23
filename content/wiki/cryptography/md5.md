---
{"id":"crypto-md5","title":"MD5","slug":"md5","parent":"crypto-hash","type":"algorithm","order":10,"related":["crypto-collisions","crypto-sha1","crypto-password-hashes"],"sources":[{"id":"lecture-crypto-1","pages":[18,19,20]},{"id":"manual","pages":[8,9]}],"permalink":"cryptography/hash/md5"}
---
## Qué produce MD5

**MD5 es una función hash**: calcula un resumen de 128 bits a partir de los datos de entrada. Esos 128 bits se representan con 32 dígitos hexadecimales, porque cada dígito representa cuatro bits. El resumen se calcula y compara; no se descifra para recuperar el mensaje.

## Ejemplo de la cátedra: una mayúscula cambia la entrada

Cripto, parte 1, página 18, muestra estos comandos y resultados:

```text
$ echo "Ciberseguridad" | md5sum
0e6e40411263311de0fa956a73cb2130  -
$ echo "CiberSeguridad" | md5sum
d5c4752e4a718ee4ad8fc8ba81a833e2  -
```

El cambio de `s` a `S` produce datos diferentes y los resúmenes mostrados también son diferentes. Para reproducirlos hay que conservar la entrada exacta: el manual complementario, página 9, aclara que `echo` normalmente añade un salto de línea. Calcular el hash del texto sin ese salto procesa otros bytes.

## Qué demuestra una colisión

En la página 20, la clase muestra dos archivos de imagen distintos, `ship.jpg` y `plane.jpg`, con el mismo MD5. Eso es una **colisión**: dos entradas diferentes producen el mismo resumen.

Por tanto, que dos archivos compartan MD5 no demuestra que sus bytes sean idénticos. El manual complementario, página 8, señala que MD5 no es adecuado para aplicaciones que dependen de la resistencia a colisiones.

:::question ¿Una cadena de 32 dígitos hexadecimales identifica inequívocamente a MD5?
No. Es compatible con su longitud, pero podría pertenecer a otra función o ser un valor truncado. Hace falta conocer cómo se obtuvo.
:::
