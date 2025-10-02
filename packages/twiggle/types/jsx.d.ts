declare namespace JSX {
    type Element = string;
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicElements {
        [tagName: string]: any;
    }
    interface DOMAttributes<T> {
        children?: any;
        dangerouslySetInnerHTML?: {
            __html: string;
        };
        onCopy?: (event: ClipboardEvent) => void;
        onCut?: (event: ClipboardEvent) => void;
        onPaste?: (event: ClipboardEvent) => void;
        onCompositionEnd?: (event: CompositionEvent) => void;
        onCompositionStart?: (event: CompositionEvent) => void;
        onCompositionUpdate?: (event: CompositionEvent) => void;
        onFocus?: (event: FocusEvent) => void;
        onBlur?: (event: FocusEvent) => void;
        onChange?: (event: Event) => void;
        onInput?: (event: Event) => void;
        onBeforeInput?: (event: Event) => void;
        onInvalid?: (event: Event) => void;
        onLoad?: (event: Event) => void;
        onError?: (event: Event) => void; // also a global event
        onKeyDown?: (event: KeyboardEvent) => void;
        onKeyPress?: (event: KeyboardEvent) => void;
        onKeyUp?: (event: KeyboardEvent) => void;
        onAbort?: (event: Event) => void;
        onCanPlay?: (event: Event) => void;
        onCanPlayThrough?: (event: Event) => void;
        onDurationChange?: (event: Event) => void;
        onEmptied?: (event: Event) => void;
        onEncrypted?: (event: Event) => void;
        onEnded?: (event: Event) => void;
        onLoadedData?: (event: Event) => void;
        onLoadedMetadata?: (event: Event) => void;
        onLoadStart?: (event: Event) => void;
        onPause?: (event: Event) => void;
        onPlay?: (event: Event) => void;
        onPlaying?: (event: Event) => void;
        onProgress?: (event: Event) => void;
        onRateChange?: (event: Event) => void;
        onSeeked?: (event: Event) => void;
        onSeeking?: (event: Event) => void;
        onStalled?: (event: Event) => void;
        onSuspend?: (event: Event) => void;
        onTimeUpdate?: (event: Event) => void;
        onVolumeChange?: (event: Event) => void;
        onWaiting?: (event: Event) => void;
        onAuxClick?: (event: MouseEvent) => void;
        onClick?: (event: MouseEvent) => void;
        onContextMenu?: (event: MouseEvent) => void;
        onDoubleClick?: (event: MouseEvent) => void;
        onDrag?: (event: DragEvent) => void;
        onDragEnd?: (event: DragEvent) => void;
        onDragEnter?: (event: DragEvent) => void;
        onDragExit?: (event: DragEvent) => void;
        onDragLeave?: (event: DragEvent) => void;
        onDragOver?: (event: DragEvent) => void;
        onDragStart?: (event: DragEvent) => void;
        onDrop?: (event: DragEvent) => void;
        onMouseDown?: (event: MouseEvent) => void;
        onMouseEnter?: (event: MouseEvent) => void;
        onMouseLeave?: (event: MouseEvent) => void;
        onMouseMove?: (event: MouseEvent) => void;
        onMouseOut?: (event: MouseEvent) => void;
        onMouseOver?: (event: MouseEvent) => void;
        onMouseUp?: (event: MouseEvent) => void;
        onPointerDown?: (event: PointerEvent) => void;
        onPointerMove?: (event: PointerEvent) => void;
        onPointerUp?: (event: PointerEvent) => void;
        onPointerCancel?: (event: PointerEvent) => void;
        onPointerEnter?: (event: PointerEvent) => void;
        onPointerLeave?: (event: PointerEvent) => void;
        onPointerOver?: (event: PointerEvent) => void;
        onPointerOut?: (event: PointerEvent) => void;
        onGotPointerCapture?: (event: PointerEvent) => void;
        onLostPointerCapture?: (event: PointerEvent) => void;
        onScroll?: (event: UIEvent) => void;
        onWheel?: (event: WheelEvent) => void;
        onTouchCancel?: (event: TouchEvent) => void;
        onTouchEnd?: (event: TouchEvent) => void;
        onTouchMove?: (event: TouchEvent) => void;
        onTouchStart?: (event: TouchEvent) => void;
        onAnimationStart?: (event: AnimationEvent) => void;
        onAnimationEnd?: (event: AnimationEvent) => void;
        onAnimationIteration?: (event: AnimationEvent) => void;
        onTransitionEnd?: (event: TransitionEvent) => void;
    }

    // --- HTML Global Attributes ---
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        accessKey?: string;
        className?: string;
        contentEditable?: boolean | "true" | "false";
        contextMenu?: string;
        dir?: string;
        draggable?: boolean | "true" | "false";
        hidden?: boolean;
        id?: string;
        lang?: string;
        placeholder?: string;
        slot?: string;
        spellCheck?: boolean | "true" | "false";
        style?: { [key: string]: string | number };
        tabIndex?: number;
        title?: string;
        translate?: "yes" | "no";
        // WAI-ARIA
        role?: string;
        // RDFa Attributes
        about?: string;
        datatype?: string;
        inlist?: any;
        prefix?: string;
        property?: string;
        resource?: string;
        typeof?: string;
        vocab?: string;
        // Non-standard Attributes
        autoCapitalize?: string;
        autoCorrect?: string;
        autoSave?: string;
        color?: string;
        itemProp?: string;
        itemScope?: boolean;
        itemType?: string;
        itemID?: string;
        itemRef?: string;
        results?: number;
        security?: string;
        unselectable?: "on" | "off";
    }

    // --- Specific HTML Elements ---
    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
        download?: any;
        href?: string;
        hrefLang?: string;
        media?: string;
        ping?: string;
        rel?: string;
        target?: string;
        type?: string;
        referrerPolicy?: string;
    }

    interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

    interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: string;
        coords?: string;
        download?: any;
        href?: string;
        hrefLang?: string;
        media?: string;
        rel?: string;
        shape?: string;
        target?: string;
    }

    interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
        href?: string;
        target?: string;
    }

    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string;
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        autoFocus?: boolean;
        disabled?: boolean;
        form?: string;
        formAction?: string;
        formEncType?: string;
        formMethod?: string;
        formNoValidate?: boolean;
        formTarget?: string;
        name?: string;
        type?: "submit" | "reset" | "button";
        value?: string | string[] | number;
    }

    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: number | string;
        width?: number | string;
    }

    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: number;
        width?: number | string;
    }

    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: number;
    }

    interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: boolean;
    }

    interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string;
        dateTime?: string;
    }

    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: boolean;
    }

    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: number | string;
        src?: string;
        type?: string;
        width?: number | string;
    }

    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean;
        form?: string;
        name?: string;
    }

    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        acceptCharset?: string;
        action?: string;
        autoComplete?: string;
        encType?: string;
        method?: string;
        name?: string;
        noValidate?: boolean;
        target?: string;
    }

    interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
        manifest?: string;
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        allow?: string;
        allowFullScreen?: boolean;
        allowTransparency?: boolean;
        frameBorder?: number | string;
        height?: number | string;
        loading?: "eager" | "lazy";
        marginHeight?: number;
        marginWidth?: number;
        name?: string;
        referrerPolicy?: string;
        sandbox?: string;
        scrolling?: string;
        seamless?: boolean;
        src?: string;
        srcDoc?: string;
        width?: number | string;
    }

    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: string;
        crossOrigin?: "anonymous" | "use-credentials" | "";
        decoding?: "async" | "auto" | "sync";
        height?: number | string;
        loading?: "eager" | "lazy";
        referrerPolicy?: "no-referrer" | "origin" | "unsafe-url";
        sizes?: string;
        src?: string;
        srcSet?: string;
        useMap?: string;
        width?: number | string;
    }

    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string;
        dateTime?: string;
    }

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        accept?: string;
        alt?: string;
        autoComplete?: string;
        autoFocus?: boolean;
        capture?: boolean | "user" | "environment"; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
        checked?: boolean;
        crossOrigin?: string;
        disabled?: boolean;
        enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
        form?: string;
        formAction?: string;
        formEncType?: string;
        formMethod?: string;
        formNoValidate?: boolean;
        formTarget?: string;
        height?: number | string;
        list?: string;
        max?: number | string;
        maxLength?: number;
        min?: number | string;
        minLength?: number;
        multiple?: boolean;
        name?: string;
        pattern?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        size?: number;
        src?: string;
        step?: number | string;
        type?: string;
        value?: string | string[] | number;
        width?: number | string;
    }

    interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
        autoFocus?: boolean;
        challenge?: string;
        disabled?: boolean;
        form?: string;
        keyType?: string;
        keyParams?: string;
        name?: string;
    }

    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        htmlFor?: string;
    }

    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: string | number;
    }

    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
        as?: string;
        crossOrigin?: string;
        href?: string;
        hrefLang?: string;
        integrity?: string;
        media?: string;
        imageSrcSet?: string;
        imageSizes?: string;
        referrerPolicy?: string;
        rel?: string;
        sizes?: string;
        type?: string;
        charSet?: string;
    }

    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: string;
    }

    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
        type?: string;
    }

    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoPlay?: boolean;
        controls?: boolean;
        controlsList?: string;
        crossOrigin?: "anonymous" | "use-credentials" | "";
        loop?: boolean;
        mediaGroup?: string;
        muted?: boolean;
        playsInline?: boolean;
        preload?: string;
        src?: string;
    }

    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
        charSet?: string;
        content?: string;
        httpEquiv?: string;
        name?: string;
    }

    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: string;
        high?: number;
        low?: number;
        max?: number | string;
        min?: number | string;
        optimum?: number;
        value?: string | string[] | number;
    }

    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string;
    }

    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
        classID?: string;
        data?: string;
        form?: string;
        height?: number | string;
        name?: string;
        type?: string;
        useMap?: string;
        width?: number | string;
        wmode?: string;
    }

    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
        reversed?: boolean;
        start?: number;
        type?: "1" | "a" | "A" | "i" | "I";
    }

    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean;
        label?: string;
    }

    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean;
        label?: string;
        selected?: boolean;
        value?: string | string[] | number;
    }

    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: string;
        htmlFor?: string;
        name?: string;
    }

    interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: string;
        value?: string | string[] | number;
    }

    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        max?: number | string;
        value?: string | string[] | number;
    }

    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
        async?: boolean;
        charSet?: string;
        crossOrigin?: "anonymous" | "use-credentials" | "";
        defer?: boolean;
        integrity?: string;
        noModule?: boolean;
        nonce?: string;
        referrerPolicy?: "no-referrer" | "origin" | "unsafe-url";
        src?: string;
        type?: string;
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: string;
        autoFocus?: boolean;
        disabled?: boolean;
        form?: string;
        multiple?: boolean;
        name?: string;
        required?: boolean;
        size?: number;
        value?: string | string[] | number;
    }

    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: string;
        sizes?: string;
        src?: string;
        srcSet?: string;
        type?: string;
    }

    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: string;
        nonce?: string;
        scoped?: boolean;
        type?: string;
    }

    interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
        cellPadding?: number | string;
        cellSpacing?: number | string;
        summary?: string;
        width?: number | string;
    }

    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: string;
        autoFocus?: boolean;
        cols?: number;
        dirName?: string;
        disabled?: boolean;
        form?: string;
        maxLength?: number;
        minLength?: number;
        name?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        rows?: number;
        value?: string | string[] | number;
        wrap?: string;
    }

    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: "left" | "center" | "right" | "justify" | "char";
        colSpan?: number;
        headers?: string;
        rowSpan?: number;
        scope?: string;
        abbr?: string;
        height?: number | string;
        width?: number | string;
        valign?: "top" | "middle" | "bottom" | "baseline";
    }

    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: "left" | "center" | "right" | "justify" | "char";
        colSpan?: number;
        headers?: string;
        rowSpan?: number;
        scope?: string;
        abbr?: string;
        height?: number | string;
        width?: number | string;
        valign?: "top" | "middle" | "bottom" | "baseline";
    }

    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
        dateTime?: string;
    }

    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
        default?: boolean;
        kind?: string;
        label?: string;
        src?: string;
        srcLang?: string;
    }

    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
        height?: number | string;
        playsInline?: boolean;
        poster?: string;
        width?: number | string;
        disablePictureInPicture?: boolean;
    }

    interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
        allowFullScreen?: boolean;
        allowpopups?: boolean;
        autoFocus?: boolean;
        autosize?: boolean;
        blinkfeatures?: string;
        disableblinkfeatures?: string;
        disableguestresize?: boolean;
        disablewebsecurity?: boolean;
        guestinstance?: string;
        httpreferrer?: string;
        nodeintegration?: boolean;
        partition?: string;
        plugins?: boolean;
        preload?: string;
        src?: string;
        useragent?: string;
        webpreferences?: string;
    }

    // --- SVG Attributes ---
    interface SVGAttributes<T> extends DOMAttributes<T> {
        // Attributes specific to SVG
        accentHeight?: number | string;
        accumulate?: "none" | "sum";
        additive?: "replace" | "sum";
        alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "hanging" | "mathematical" | "alphabetic";
        allowReorder?: "no" | "yes";
        alphabetic?: number | string;
        amplitude?: number | string;
        arabicForm?: "initial" | "medial" | "terminal" | "isolated";
        ascent?: number | string;
        attributeName?: string;
        attributeType?: string;
        autoReverse?: boolean | "true" | "false";
        azimuth?: number | string;
        baseFrequency?: number | string;
        baselineShift?: number | string;
        baseProfile?: number | string;
        bbox?: number | string;
        begin?: number | string;
        bias?: number | string;
        by?: number | string;
        calcMode?: number | string;
        capHeight?: number | string;
        clip?: string;
        clipPath?: string;
        clipPathUnits?: number | string;
        clipRule?: number | string;
        colorInterpolation?: number | string;
        colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
        colorProfile?: number | string;
        colorRendering?: "auto" | "sRGB" | "linearRGB" | "inherit";
        contentScriptType?: number | string;
        contentStyleType?: number | string;
        cursor?: number | string;
        cx?: number | string;
        cy?: number | string;
        d?: string;
        decelerate?: number | string;
        descent?: number | string;
        diffuseConstant?: number | string;
        direction?: number | string;
        display?: number | string;
        divisor?: number | string;
        dominantBaseline?: number | string;
        dur?: number | string;
        dx?: number | string;
        dy?: number | string;
        edgeMode?: number | string;
        elevation?: number | string;
        enableBackground?: number | string;
        end?: number | string;
        exponent?: number | string;
        externalResourcesRequired?: boolean | "true" | "false";
        fill?: string;
        fillOpacity?: number | string;
        fillRule?: "nonzero" | "evenodd" | "inherit";
        filter?: string;
        filterRes?: number | string;
        filterUnits?: number | string;
        floodColor?: number | string;
        floodOpacity?: number | string;
        focusable?: boolean | "true" | "false";
        fontFamily?: string;
        fontSize?: number | string;
        fontSizeAdjust?: number | string;
        fontStretch?: number | string;
        fontStyle?: number | string;
        fontVariant?: number | string;
        fontWeight?: number | string;
        format?: number | string;
        from?: number | string;
        fx?: number | string;
        fy?: number | string;
        g1?: number | string;
        g2?: number | string;
        glyphName?: number | string;
        glyphOrientationHorizontal?: number | string;
        glyphOrientationVertical?: number | string;
        glyphRef?: number | string;
        gradientTransform?: string;
        gradientUnits?: string;
        hanging?: number | string;
        horizAdvX?: number | string;
        horizOriginX?: number | string;
        ideographic?: number | string;
        imageRendering?: "auto" | "optimizeQuality" | "optimizeSpeed";
        in2?: number | string;
        in?: string;
        intercept?: number | string;
        k1?: number | string;
        k2?: number | string;
        k3?: number | string;
        k4?: number | string;
        k?: number | string;
        kernelMatrix?: number | string;
        kernelUnitLength?: number | string;
        kerning?: number | string;
        keyPoints?: number | string;
        keySplines?: number | string;
        keyTimes?: number | string;
        lengthAdjust?: number | string;
        letterSpacing?: number | string;
        lightingColor?: number | string;
        limitingConeAngle?: number | string;
        local?: number | string;
        markerEnd?: string;
        markerMid?: string;
        markerStart?: string;
        markerHeight?: number | string;
        markerUnits?: number | string;
        markerWidth?: number | string;
        mask?: string;
        maskContentUnits?: number | string;
        maskUnits?: number | string;
        mathematical?: number | string;
        mode?: number | string;
        numOctaves?: number | string;
        offset?: number | string;
        opacity?: number | string;
        operator?: number | string;
        order?: number | string;
        orient?: number | string;
        orientation?: number | string;
        origin?: number | string;
        overflow?: number | string;
        overlinePosition?: number | string;
        overlineThickness?: number | string;
        paintOrder?: number | string;
        panose1?: number | string;
        pathLength?: number | string;
        patternContentUnits?: number | string;
        patternTransform?: string;
        patternUnits?: number | string;
        pointerEvents?: number | string;
        points?: string;
        pointsAtX?: number | string;
        pointsAtY?: number | string;
        pointsAtZ?: number | string;
        preserveAlpha?: boolean | "true" | "false";
        preserveAspectRatio?: string;
        primitiveUnits?: number | string;
        r?: number | string;
        radius?: number | string;
        refX?: number | string;
        refY?: number | string;
        renderingIntent?: number | string;
        repeatCount?: number | string;
        repeatDur?: number | string;
        requiredExtensions?: number | string;
        requiredFeatures?: number | string;
        restart?: number | string;
        result?: string;
        rotate?: number | string;
        rx?: number | string;
        ry?: number | string;
        scale?: number | string;
        seed?: number | string;
        shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
        slope?: number | string;
        spacing?: number | string;
        specularConstant?: number | string;
        specularExponent?: number | string;
        speed?: number | string;
        spreadMethod?: string;
        startOffset?: number | string;
        stdDeviation?: number | string;
        stemh?: number | string;
        stemv?: number | string;
        stitchTiles?: number | string;
        stopColor?: string;
        stopOpacity?: number | string;
        strikethroughPosition?: number | string;
        strikethroughThickness?: number | string;
        string?: number | string;
        stroke?: string;
        strokeDasharray?: string | number;
        strokeDashoffset?: string | number;
        strokeLinecap?: "butt" | "round" | "square" | "inherit";
        strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
        strokeMiterlimit?: number | string;
        strokeOpacity?: number | string;
        strokeWidth?: number | string;
        surfaceScale?: number | string;
        systemLanguage?: number | string;
        tableValues?: number | string;
        targetX?: number | string;
        targetY?: number | string;
        textAnchor?: string;
        textDecoration?: number | string;
        textLength?: number | string;
        textRendering?: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
        to?: number | string;
        transform?: string;
        u1?: number | string;
        u2?: number | string;
        underlinePosition?: number | string;
        underlineThickness?: number | string;
        unicode?: number | string;
        unicodeBidi?: number | string;
        unicodeRange?: number | string;
        unitsPerEm?: number | string;
        vAlphabetic?: number | string;
        values?: string;
        vectorEffect?: number | string;
        version?: string;
        vertAdvY?: number | string;
        vertOriginX?: number | string;
        vertOriginY?: number | string;
        vHanging?: number | string;
        vIdeographic?: number | string;
        viewBox?: string;
        viewTarget?: number | string;
        visibility?: number | string;
        vMathematical?: number | string;
        widths?: number | string;
        wordSpacing?: number | string;
        writingMode?: number | string;
        x1?: number | string;
        x2?: number | string;
        x?: number | string;
        xChannelSelector?: string;
        xHeight?: number | string;
        xlinkActuate?: string;
        xlinkArcrole?: string;
        xlinkHref?: string;
        xlinkRole?: string;
        xlinkShow?: string;
        xlinkTitle?: string;
        xlinkType?: string;
        xmlBase?: string;
        xmlLang?: string;
        xmlns?: string;
        xmlnsXlink?: string;
        xmlSpace?: string;
        y1?: number | string;
        y2?: number | string;
        y?: number | string;
        yChannelSelector?: string;
        z?: number | string;
        zoomAndPan?: string;
    }

    interface IntrinsicElements {
        // HTML
        a: AnchorHTMLAttributes<HTMLAnchorElement>;
        abbr: HTMLAttributes<HTMLElement>;
        address: HTMLAttributes<HTMLElement>;
        area: AreaHTMLAttributes<HTMLAreaElement>;
        article: HTMLAttributes<HTMLElement>;
        aside: HTMLAttributes<HTMLElement>;
        audio: AudioHTMLAttributes<HTMLAudioElement>;
        b: HTMLAttributes<HTMLElement>;
        base: BaseHTMLAttributes<HTMLBaseElement>;
        bdi: HTMLAttributes<HTMLElement>;
        bdo: HTMLAttributes<HTMLElement>;
        blockquote: BlockquoteHTMLAttributes<HTMLQuoteElement>;
        body: HTMLAttributes<HTMLBodyElement>;
        br: HTMLAttributes<HTMLBRElement>;
        button: ButtonHTMLAttributes<HTMLButtonElement>;
        canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
        caption: HTMLAttributes<HTMLElement>;
        cite: HTMLAttributes<HTMLElement>;
        code: HTMLAttributes<HTMLElement>;
        col: ColHTMLAttributes<HTMLTableColElement>;
        colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
        data: HTMLAttributes<HTMLDataElement>;
        datalist: HTMLAttributes<HTMLDataListElement>;
        dd: HTMLAttributes<HTMLElement>;
        del: DelHTMLAttributes<HTMLModElement>;
        details: DetailsHTMLAttributes<HTMLDetailsElement>;
        dfn: HTMLAttributes<HTMLElement>;
        dialog: DialogHTMLAttributes<HTMLDialogElement>;
        div: HTMLAttributes<HTMLDivElement>;
        dl: HTMLAttributes<HTMLDListElement>;
        dt: HTMLAttributes<HTMLElement>;
        em: HTMLAttributes<HTMLElement>;
        embed: EmbedHTMLAttributes<HTMLEmbedElement>;
        fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
        figcaption: HTMLAttributes<HTMLElement>;
        figure: HTMLAttributes<HTMLElement>;
        footer: HTMLAttributes<HTMLElement>;
        form: FormHTMLAttributes<HTMLFormElement>;
        h1: HTMLAttributes<HTMLHeadingElement>;
        h2: HTMLAttributes<HTMLHeadingElement>;
        h3: HTMLAttributes<HTMLHeadingElement>;
        h4: HTMLAttributes<HTMLHeadingElement>;
        h5: HTMLAttributes<HTMLHeadingElement>;
        h6: HTMLAttributes<HTMLHeadingElement>;
        head: HTMLAttributes<HTMLHeadElement>;
        header: HTMLAttributes<HTMLElement>;
        hgroup: HTMLAttributes<HTMLElement>;
        hr: HTMLAttributes<HTMLHRElement>;
        html: HtmlHTMLAttributes<HTMLHtmlElement>;
        i: HTMLAttributes<HTMLElement>;
        iframe: IframeHTMLAttributes<HTMLIFrameElement>;
        img: ImgHTMLAttributes<HTMLImageElement>;
        input: InputHTMLAttributes<HTMLInputElement>;
        ins: InsHTMLAttributes<HTMLModElement>;
        kbd: HTMLAttributes<HTMLElement>;
        keygen: KeygenHTMLAttributes<HTMLElement>;
        label: LabelHTMLAttributes<HTMLLabelElement>;
        legend: HTMLAttributes<HTMLLegendElement>;
        li: LiHTMLAttributes<HTMLLIElement>;
        link: LinkHTMLAttributes<HTMLLinkElement>;
        main: HTMLAttributes<HTMLElement>;
        map: MapHTMLAttributes<HTMLMapElement>;
        mark: HTMLAttributes<HTMLElement>;
        menu: MenuHTMLAttributes<HTMLElement>;
        meta: MetaHTMLAttributes<HTMLMetaElement>;
        meter: MeterHTMLAttributes<HTMLMeterElement>;
        nav: HTMLAttributes<HTMLElement>;
        noscript: HTMLAttributes<HTMLElement>;
        object: ObjectHTMLAttributes<HTMLObjectElement>;
        ol: OlHTMLAttributes<HTMLOListElement>;
        optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
        option: OptionHTMLAttributes<HTMLOptionElement>;
        output: OutputHTMLAttributes<HTMLOutputElement>;
        p: HTMLAttributes<HTMLParagraphElement>;
        param: ParamHTMLAttributes<HTMLParamElement>;
        picture: HTMLAttributes<HTMLElement>;
        pre: HTMLAttributes<HTMLPreElement>;
        progress: ProgressHTMLAttributes<HTMLProgressElement>;
        q: QuoteHTMLAttributes<HTMLQuoteElement>;
        rp: HTMLAttributes<HTMLElement>;
        rt: HTMLAttributes<HTMLElement>;
        ruby: HTMLAttributes<HTMLElement>;
        s: HTMLAttributes<HTMLElement>;
        samp: HTMLAttributes<HTMLElement>;
        script: ScriptHTMLAttributes<HTMLScriptElement>;
        section: HTMLAttributes<HTMLElement>;
        select: SelectHTMLAttributes<HTMLSelectElement>;
        slot: HTMLAttributes<HTMLSlotElement>;
        small: HTMLAttributes<HTMLElement>;
        source: SourceHTMLAttributes<HTMLSourceElement>;
        span: HTMLAttributes<HTMLSpanElement>;
        strong: HTMLAttributes<HTMLElement>;
        style: StyleHTMLAttributes<HTMLStyleElement>;
        sub: HTMLAttributes<HTMLElement>;
        summary: HTMLAttributes<HTMLElement>;
        sup: HTMLAttributes<HTMLElement>;
        table: TableHTMLAttributes<HTMLTableElement>;
        tbody: HTMLAttributes<HTMLTableSectionElement>;
        td: TdHTMLAttributes<HTMLTableDataCellElement>;
        template: HTMLAttributes<HTMLTemplateElement>;
        textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
        tfoot: HTMLAttributes<HTMLTableSectionElement>;
        th: ThHTMLAttributes<HTMLTableHeaderCellElement>;
        thead: HTMLAttributes<HTMLTableSectionElement>;
        time: TimeHTMLAttributes<HTMLTimeElement>;
        title: HTMLAttributes<HTMLTitleElement>;
        tr: HTMLAttributes<HTMLTableRowElement>;
        track: TrackHTMLAttributes<HTMLTrackElement>;
        u: HTMLAttributes<HTMLElement>;
        ul: HTMLAttributes<HTMLUListElement>;
        "var": HTMLAttributes<HTMLElement>;
        video: VideoHTMLAttributes<HTMLVideoElement>;
        wbr: HTMLAttributes<HTMLElement>;
        // SVG
        svg: SVGAttributes<SVGSVGElement>;
        animate: SVGAttributes<SVGAnimateElement>;
        animateMotion: SVGAttributes<SVGAnimateMotionElement>;
        animateTransform: SVGAttributes<SVGAnimateTransformElement>;
        circle: SVGAttributes<SVGCircleElement>;
        clipPath: SVGAttributes<SVGClipPathElement>;
        defs: SVGAttributes<SVGDefsElement>;
        desc: SVGAttributes<SVGDescElement>;
        ellipse: SVGAttributes<SVGEllipseElement>;
        feBlend: SVGAttributes<SVGFEBlendElement>;
        feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
        feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
        feComposite: SVGAttributes<SVGFECompositeElement>;
        feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
        feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
        feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
        feDistantLight: SVGAttributes<SVGFEDistantLightElement>;
        feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
        feFlood: SVGAttributes<SVGFEFloodElement>;
        feFuncA: SVGAttributes<SVGFEFuncAElement>;
        feFuncB: SVGAttributes<SVGFEFuncBElement>;
        feFuncG: SVGAttributes<SVGFEFuncGElement>;
        feFuncR: SVGAttributes<SVGFEFuncRElement>;
        feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
        feImage: SVGAttributes<SVGFEImageElement>;
        feMerge: SVGAttributes<SVGFEMergeElement>;
        feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
        feMorphology: SVGAttributes<SVGFEMorphologyElement>;
        feOffset: SVGAttributes<SVGFEOffsetElement>;
        fePointLight: SVGAttributes<SVGFEPointLightElement>;
        feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
        feSpotLight: SVGAttributes<SVGFESpotLightElement>;
        feTile: SVGAttributes<SVGFETileElement>;
        feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
        filter: SVGAttributes<SVGFilterElement>;
        foreignObject: SVGAttributes<SVGForeignObjectElement>;
        g: SVGAttributes<SVGGElement>;
        image: SVGAttributes<SVGImageElement>;
        line: SVGAttributes<SVGLineElement>;
        linearGradient: SVGAttributes<SVGLinearGradientElement>;
        marker: SVGAttributes<SVGMarkerElement>;
        mask: SVGAttributes<SVGMaskElement>;
        metadata: SVGAttributes<SVGMetadataElement>;
        mpath: SVGAttributes<SVGMPathElement>;
        path: SVGAttributes<SVGPathElement>;
        pattern: SVGAttributes<SVGPatternElement>;
        polygon: SVGAttributes<SVGPolygonElement>;
        polyline: SVGAttributes<SVGPolylineElement>;
        radialGradient: SVGAttributes<SVGRadialGradientElement>;
        rect: SVGAttributes<SVGRectElement>;
        set: SVGAttributes<SVGSetElement>;
        stop: SVGAttributes<SVGStopElement>;
        switch: SVGAttributes<SVGSwitchElement>;
        symbol: SVGAttributes<SVGSymbolElement>;
        text: SVGAttributes<SVGTextElement>;
        textPath: SVGAttributes<SVGTextPathElement>;
        tspan: SVGAttributes<SVGTSpanElement>;
        use: SVGAttributes<SVGUseElement>;
        view: SVGAttributes<SVGViewElement>;
    }
}
