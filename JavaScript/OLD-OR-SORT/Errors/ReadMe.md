# Fehler

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Error Object](#error-object)
- [Simple Error Instanzen](#simple-error-instanzen)
- [Error.Stack Libs](#errorstack-libs)
- [Angular Errors (Under Construction)](#angular-errors-under-construction)

<!-- /code_chunk_output -->

## Error Object

Ein Fehlerobjekt in JavaScript besteht normalerweise aus drei Bestandteilen:

1. **Name**: Der Name des Fehlers, z.B. "TypeError" oder "SyntaxError". Dies gibt an, um welche Art von Fehler es sich handelt.

2. **Message**: Eine beschreibende Nachricht, die näher erläutert, was genau schief gelaufen ist.

3. **Stack-Trace**: Eine Liste von Funktionsaufrufen und Zeilennummern, die den Aufrufpfad bis zum Fehler zeigen. Dies kann sehr hilfreich sein, um den genauen Ort des Fehlers zu finden und zu beheben.

## Simple Error Instanzen

Wenn ein Fehler in JavaScript nicht eine Instanz des ErrorEvents ist, kann es eine Instanz einer der folgenden Fehlerklassen sein:

1. Error: Die grundlegende Fehlerklasse in JavaScript. Sie wird verwendet, um allgemeine Fehler zu repräsentieren, die während der Ausführung von Code auftreten können.

2. TypeError: Eine Unterklasse von Error, die verwendet wird, wenn ein Wert nicht vom erwarteten Typ ist oder auf eine nicht vorhandene Eigenschaft eines Objekts zugegriffen wird.

3. RangeError: Eine Unterklasse von Error, die verwendet wird, wenn eine Zahl außerhalb des gültigen Bereichs liegt. Zum Beispiel, wenn versucht wird, einen Wert außerhalb des Bereichs einer numerischen Variable zu setzen.

4. ReferenceError: Eine Unterklasse von Error, die verwendet wird, wenn versucht wird, auf eine nicht definierte Variable oder Funktion zuzugreifen.

5. SyntaxError: Eine Unterklasse von Error, die verwendet wird, wenn der Code eine ungültige Syntax aufweist. Zum Beispiel, wenn eine Klammer oder ein Semikolon fehlt oder eine unbekannte Schlüsselwort verwendet wird.

6. EvalError: Eine Unterklasse von Error, die normalerweise nicht in modernen Browsern verwendet wird. Sie wird verwendet, wenn ein Fehler im Zusammenhang mit der Verwendung der eval()-Funktion auftritt.

Hier sind weitere Fehlerklassen in JavaScript:

1. URIError: Eine Unterklasse von Error, die verwendet wird, wenn ein ungültiger URI (Uniform Resource Identifier) verwendet wird.

2. DOMException: Eine Fehlerklasse, die von der Document Object Model (DOM)-API verwendet wird, um Fehler zu melden, die im Zusammenhang mit der Manipulation von Dokumenten auftreten.

3. Web API-spezifische Fehler: Einige Web-APIs definieren ihre eigenen Fehlerklassen. Beispielsweise definiert die Fetch-API die Fehlerklassen `TypeError` und `AbortError`.

4. Benutzerdefinierte Fehlerklassen: Entwickler können ihre eigenen Fehlerklassen definieren, indem sie die `Error`\-Klasse erweitern.

## Error.Stack Libs

Es gibt mehrere JavaScript-Bibliotheken, die den Inhalt von `error.stack`\-Objekten in einem formatierten und lesbareren Format ausgeben können. Hier sind einige Beispiele:

1. StackTrace.js: Eine Bibliothek für den Browser, die den Aufrufstapel in ein Array von Stack-Trace-Objekten konvertiert und eine Vielzahl von nützlichen Methoden bereitstellt, um das Traceback in verschiedenen Formaten (HTML, JSON, usw.) auszugeben.

2. TraceKit: Eine Bibliothek für den Browser, die den Aufrufstapel extrahiert und in ein Array von Stack-Trace-Objekten umwandelt. Es bietet auch Methoden zum Filtern und Formatieren des Tracebacks.

3. StackTracey: Eine Bibliothek für den Node.js-Server, die den Aufrufstapel in einem formatierten und lesbareren Format ausgibt, einschließlich Farbcodierung und Syntaxhervorhebung.

4. PrettyError: Eine Bibliothek für den Node.js-Server, die den Aufrufstapel in einem lesbareren Format ausgibt und die Ausgabe in Farbe formatiert.

## Angular Errors (Under Construction)

```shell
Fehlercode	Fehlername
NG0000	Angular konnte nicht initialisiert werden.
NG0100	ExpressionChangedAfterItHasBeenCheckedError
NG0200	CircularDependencyError
NG0201	NoProviderError
NG0202	MixinCircularReferenceError
NG0203	InjectFromWrongContextError
NG0204	NullInjectorError
NG0205	StaticInjectorError
NG0206	NotSupportedError
NG0207	AbstractProviderError
NG0208	NoAnnotationError
NG0209	InvalidProviderError
NG0210	OutOfBoundsError
NG0211	TypeNotBoundError
NG0212	NoAnnotationError
NG0213	OpaqueTokenError
NG0214	AbstractBindingError
NG0215	CyclicDependencyError
NG0216	InvalidBindingError
NG0217	NoComponentFactoryError
NG0218	ComponentLoadingError
NG0219	ModuleWithProvidersError
NG0220	MissingIterableDifferError
NG0221	MissingPipeError
NG0222	UnknownPipeError
NG0223	InvalidPipeTransformError
NG0224	PlatformAlreadyProvidedError
NG0225	PlatformNotSupportedError
NG0226	InvalidModuleError
NG0227	InjectionTokenNotFoundError
NG0228	InvalidDirectiveDeclarationError
NG0229	InvalidCmpIdError
NG0230	MultipleComponentError
NG0231	ComponentNotFoundInModuleError
NG0232	ComponentFactoryDependencyNotFoundError
NG0233	NoNgModuleError
NG0234	NoComponentFactoryError
NG0235	InvalidNgModuleError
NG0236	NoSuchElementError
NG0237	RequireNgModuleRefError
NG0238	RecursiveNgModuleImportError
NG0239	DevModeMissingAngularCoreInjectionError
NG0240	NoAnimationPlayerError
NG0241	QueryListChangesNotSupportedError
NG0242	TemplateRefNotFoundError
NG0243	ViewDestroyedError
NG0244	ChangeDetectionError
NG0245	QueryListAlreadyDirtyError
NG0246	ContentChildNotFoundError
NG0247	ContentChildrenNotFoundError
NG0248	ViewChildNotFoundError
NG0249	ViewChildrenNotFoundError
NG0250	StaticProviderError
NG0251	ValueProviderNotFoundError
NG0252	DirectiveNotFound
NG0253	ComponentNotFound
NG0254	TokenNotFoundError
NG0255	OptionalDependencyNotFoundError
NG0256	SkipSelfNotFoundError
NG0257	SelfNotFoundError
```
