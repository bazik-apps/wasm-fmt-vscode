import type { InferInput } from "valibot";
import { integer, minValue, number, pipe } from "valibot";

const IntegerSchema = pipe(number(), integer());
type Integer = InferInput<typeof IntegerSchema>;

const NaturalNumberSchema = pipe(number(), integer(), minValue(0));
type NaturalNumber = InferInput<typeof NaturalNumberSchema>;

export const SUPPORTED_LANGUAGES = [
	"apex",
	"c",
	"cpp",
	"csharp",
	"cuda",
	"glsl",
	"java",
	"objective-c",
	"objective-cpp",
	"proto",
	"proto3",
	"tablegen",
	"textproto",
	"verilog",
] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const REFERENCE_STYLES = [
	"Chromium",
	"GNU",
	"Google",
	"InheritParentConfig",
	"LLVM",
	"Microsoft",
	"Mozilla",
	"WebKit",
] as const;
export type ReferenceStyle = (typeof REFERENCE_STYLES)[number];

type BracketAlignmentStyle = "Align" | "DontAlign" | "AlwaysBreak" | "BlockIndent";

type ArrayInitializerAlignmentStyle = "Left" | "Right" | "None";

type AlignConsecutiveStyle = {
	Enabled: boolean;
	AcrossEmptyLines: boolean;
	AcrossComments: boolean;
};

type AlignConsecutiveAssignmentsStyle = AlignConsecutiveStyle & {
	AlignCompound: boolean;
	PadOperators: boolean;
};

type AlignConsecutiveDeclarationsStyle = AlignConsecutiveStyle & {
	AlignFunctionPointers: boolean;
};

type AlignConsecutiveShortCaseStatementsStyle = AlignConsecutiveStyle & {
	AlignCaseArrows: boolean;
	AlignCaseColons: boolean;
};

type EscapedNewlineAlignmentStyle = "DontAlign" | "Left" | "LeftWithLastLine" | "Right";

type OperandAlignmentStyle = "DontAlign" | "Align" | "AlignAfterOperator";

type TrailingCommentsAlignmentKinds = "Leave" | "Always" | "Never";

type TrailingCommentsAlignmentStyle = {
	Kind: TrailingCommentsAlignmentKinds;
	OverEmptyLines: NaturalNumber;
};

type BreakBeforeNoexceptSpecifierStyle = "Never" | "OnlyWithParen" | "Always";

type ShortBlockStyle = "Never" | "Empty" | "Always";

type ShortFunctionStyle = "None" | "InlineOnly" | "Empty" | "Inline" | "All";

type ShortIfStyle = "Never" | "WithoutElse" | "OnlyFirstIf" | "AllIfsAndElse";

type ShortLambdaStyle = "None" | "Empty" | "Inline" | "All";

type ReturnTypeBreakingStyle =
	| "Automatic"
	| "ExceptShortType"
	| "All"
	| "TopLevel"
	| "AllDefinitions"
	| "TopLevelDefinitions";

type BreakTemplateDeclarationsStyle = "Leave" | "No" | "MultiLine" | "Yes";

type BitFieldColonSpacingStyle = "Both" | "None" | "Before" | "After";

type BraceWrappingAfterControlStatementStyle = "Never" | "MultiLine" | "Always";

type BraceWrappingFlags = {
	AfterCaseLabel: boolean;
	AfterClass: boolean;
	AfterControlStatement: BraceWrappingAfterControlStatementStyle;
	AfterEnum: boolean;
	AfterFunction: boolean;
	AfterNamespace: boolean;
	AfterObjCDeclaration: boolean;
	AfterStruct: boolean;
	AfterUnion: boolean;
	AfterExternBlock: boolean;
	BeforeCatch: boolean;
	BeforeElse: boolean;
	BeforeLambdaBody: boolean;
	BeforeWhile: boolean;
	IndentBraces: boolean;
	SplitEmptyFunction: boolean;
	SplitEmptyRecord: boolean;
	SplitEmptyNamespace: boolean;
};

type AttributeBreakingStyle = "Always" | "Leave" | "Never";

type BinPackStyle = "Auto" | "Always" | "Never";

type BinaryOperatorStyle = "None" | "NonAssignment" | "All";

type BraceBreakingStyle =
	| "Attach"
	| "Linux"
	| "Mozilla"
	| "Stroustrup"
	| "Allman"
	| "Whitesmiths"
	| "GNU"
	| "WebKit"
	| "Custom";

type BreakBeforeConceptDeclarationsStyle = "Never" | "Allowed" | "Always";

type BreakBeforeInlineASMColonStyle = "Never" | "OnlyMultiline" | "Always";

type BreakConstructorInitializersStyle = "BeforeColon" | "BeforeComma" | "AfterColon";

type BreakInheritanceListStyle = "BeforeColon" | "BeforeComma" | "AfterColon" | "AfterComma";

type EmptyLineAfterAccessModifierStyle = "Never" | "Leave" | "Always";

type EmptyLineBeforeAccessModifierStyle = "Never" | "Leave" | "LogicalBlock" | "Always";

type IndentExternBlockStyle = "AfterExternBlock" | "NoIndent" | "Indent";

type PPDirectiveIndentStyle = "None" | "AfterHash" | "BeforeHash";

type TrailingCommaStyle = "None" | "Wrapped";

type IntegerLiteralSeparatorStyle = {
	Binary: Integer;
	BinaryMinDigits: Integer;
	Decimal: Integer;
	DecimalMinDigits: Integer;
	Hex: Integer;
	HexMinDigits: Integer;
};

type KeepEmptyLinesStyle = {
	AtEndOfFile: boolean;
	AtStartOfBlock: boolean;
	AtStartOfFile: boolean;
};

type LambdaBodyIndentationKind = "Signature" | "OuterScope";

type LineEndingStyle = "LF" | "CRLF" | "DeriveLF" | "DeriveCRLF";

type NamespaceIndentationKind = "None" | "Inner" | "All";

type PackConstructorInitializersStyle =
	| "Never"
	| "BinPack"
	| "CurrentLine"
	| "NextLine"
	| "NextLineOnly";

type PointerAlignmentStyle = "Left" | "Right" | "Middle";

type QualifierAlignmentStyle = "Leave" | "Left" | "Right" | "Custom";

type ReferenceAlignmentStyle = "Pointer" | "Left" | "Right" | "Middle";

type RemoveParenthesesStyle = "Leave" | "MultipleParentheses" | "ReturnStatement";

type RequiresClausePositionStyle = "OwnLine" | "WithPreceding" | "WithFollowing" | "SingleLine";

type RequiresExpressionIndentationKind = "OuterScope" | "Keyword";

type SeparateDefinitionStyle = "Leave" | "Always" | "Never";

type SortIncludesOptions = "Never" | "CaseSensitive" | "CaseInsensitive";

type SortJavaStaticImportOptions = "Before" | "After";

type SortUsingDeclarationsOptions = "Never" | "Lexicographic" | "LexicographicNumeric";

type SpaceAroundPointerQualifiersStyle = "Default" | "Before" | "After" | "Both";

type SpaceBeforeParensStyle =
	| "ControlStatements"
	| "ControlStatementsExceptControlMacros"
	| "NonEmptyParentheses"
	| "Always"
	| "Custom";

type SpaceBeforeParensCustom = {
	AfterControlStatements: boolean;
	AfterForeachMacros: boolean;
	AfterFunctionDeclarationName: boolean;
	AfterFunctionDefinitionName: boolean;
	AfterIfMacros: boolean;
	AfterOverloadedOperator: boolean;
	AfterPlacementOperator: boolean;
	AfterRequiresInClause: boolean;
	AfterRequiresInExpression: boolean;
	BeforeNonEmptyParentheses: boolean;
};

type SpacesInAnglesStyle = "Never" | "Always" | "Leave";

type SpacesInLineComment = {
	Minimum: NaturalNumber;
	Maximum: NaturalNumber;
};

type SpacesInParensStyle = "Never" | "Custom";

type SpacesInParensCustom = {
	ExceptDoubleParentheses: boolean;
	InConditionalStatements: boolean;
	InCStyleCasts: boolean;
	InEmptyParentheses: boolean;
	Other: boolean;
};

type CPPStandard = "Cpp03" | "Cpp11" | "Cpp14" | "Cpp17" | "Cpp20" | "Latest" | "Auto";

type DAGArgStyle = "DontBreak" | "BreakElements" | "BreakAll";

type UseTabStyle =
	| "Never"
	| "ForIndentation"
	| "ForContinuationAndIndentation"
	| "AlignWithSpaces"
	| "Always";

export type FormatConfig = {
	AccessModifierOffset: Integer;
	AlignAfterOpenBracket: BracketAlignmentStyle;
	AlignArrayOfStructures: ArrayInitializerAlignmentStyle;
	AlignConsecutiveAssignments: AlignConsecutiveAssignmentsStyle;
	AlignConsecutiveBitFields: AlignConsecutiveStyle;
	AlignConsecutiveDeclarations: AlignConsecutiveDeclarationsStyle;
	AlignConsecutiveMacros: AlignConsecutiveStyle;
	AlignConsecutiveShortCaseStatements: AlignConsecutiveShortCaseStatementsStyle;
	AlignConsecutiveTableGenBreakingDAGArgColons: AlignConsecutiveStyle;
	AlignConsecutiveTableGenCondOperatorColons: AlignConsecutiveStyle;
	AlignConsecutiveTableGenDefinitionColons: AlignConsecutiveStyle;
	AlignEscapedNewlines: EscapedNewlineAlignmentStyle;
	AlignOperands: OperandAlignmentStyle;
	AlignTrailingComments: TrailingCommentsAlignmentStyle;
	AllowAllArgumentsOnNextLine: boolean;
	AllowAllParametersOfDeclarationOnNextLine: boolean;
	AllowBreakBeforeNoexceptSpecifier: BreakBeforeNoexceptSpecifierStyle;
	AllowShortBlocksOnASingleLine: ShortBlockStyle;
	AllowShortCaseExpressionOnASingleLine: boolean;
	AllowShortCaseLabelsOnASingleLine: boolean;
	AllowShortCompoundRequirementOnASingleLine: boolean;
	AllowShortEnumsOnASingleLine: boolean;
	AllowShortFunctionsOnASingleLine: ShortFunctionStyle;
	AllowShortIfStatementsOnASingleLine: ShortIfStyle;
	AllowShortLambdasOnASingleLine: ShortLambdaStyle;
	AllowShortLoopsOnASingleLine: boolean;
	AlwaysBreakBeforeMultilineStrings: boolean;
	BasedOnStyle: ReferenceStyle;
	BinPackArguments: boolean;
	BinPackParameters: boolean;
	BitFieldColonSpacing: BitFieldColonSpacingStyle;
	BracedInitializerIndentWidth?: NaturalNumber;
	BraceWrapping: BraceWrappingFlags;
	BreakAdjacentStringLiterals: boolean;
	BreakAfterAttributes: AttributeBreakingStyle;
	BreakAfterJavaFieldAnnotations: boolean;
	BreakAfterReturnType: ReturnTypeBreakingStyle;
	BreakBeforeBinaryOperators: BinaryOperatorStyle;
	BreakBeforeBraces: BraceBreakingStyle;
	BreakBeforeConceptDeclarations: BreakBeforeConceptDeclarationsStyle;
	BreakBeforeInlineASMColon: BreakBeforeInlineASMColonStyle;
	BreakBeforeTernaryOperators: boolean;
	BreakConstructorInitializers: BreakConstructorInitializersStyle;
	BreakFunctionDefinitionParameters: boolean;
	BreakInheritanceList: BreakInheritanceListStyle;
	BreakStringLiterals: boolean;
	BreakTemplateDeclarations: BreakTemplateDeclarationsStyle;
	ColumnLimit: NaturalNumber;
	CompactNamespaces: boolean;
	ConstructorInitializerIndentWidth: NaturalNumber;
	ContinuationIndentWidth: NaturalNumber;
	Cpp11BracedListStyle: boolean;
	DerivePointerAlignment: boolean;
	DisableFormat: boolean;
	EmptyLineAfterAccessModifier: EmptyLineAfterAccessModifierStyle;
	EmptyLineBeforeAccessModifier: EmptyLineBeforeAccessModifierStyle;
	ExperimentalAutoDetectBinPacking: boolean;
	FixNamespaceComments: boolean;
	IndentAccessModifiers: boolean;
	IndentCaseBlocks: boolean;
	IndentCaseLabels: boolean;
	IndentExternBlock: IndentExternBlockStyle;
	IndentGotoLabels: boolean;
	IndentPPDirectives: PPDirectiveIndentStyle;
	IndentRequiresClause: boolean;
	IndentWidth: NaturalNumber;
	IndentWrappedFunctionNames: boolean;
	InsertBraces: boolean;
	InsertNewlineAtEOF: boolean;
	InsertTrailingCommas: TrailingCommaStyle;
	IntegerLiteralSeparator: IntegerLiteralSeparatorStyle;
	KeepEmptyLines: KeepEmptyLinesStyle;
	LambdaBodyIndentation: LambdaBodyIndentationKind;
	LineEnding: LineEndingStyle;
	MaxEmptyLinesToKeep: NaturalNumber;
	NamespaceIndentation: NamespaceIndentationKind;
	ObjCBinPackProtocolList: BinPackStyle;
	ObjCBlockIndentWidth: NaturalNumber;
	ObjCBreakBeforeNestedBlockParam: boolean;
	ObjCSpaceAfterProperty: boolean;
	ObjCSpaceBeforeProtocolList: boolean;
	PackConstructorInitializers: PackConstructorInitializersStyle;
	PenaltyBreakAssignment: NaturalNumber;
	PenaltyBreakBeforeFirstCallParameter: NaturalNumber;
	PenaltyBreakComment: NaturalNumber;
	PenaltyBreakFirstLessLess: NaturalNumber;
	PenaltyBreakOpenParenthesis: NaturalNumber;
	PenaltyBreakScopeResolution: NaturalNumber;
	PenaltyBreakString: NaturalNumber;
	PenaltyBreakTemplateDeclaration: NaturalNumber;
	PenaltyExcessCharacter: NaturalNumber;
	PenaltyIndentedWhitespace: NaturalNumber;
	PenaltyReturnTypeOnItsOwnLine: NaturalNumber;
	PointerAlignment: PointerAlignmentStyle;
	PPIndentWidth: Integer;
	QualifierAlignment: QualifierAlignmentStyle;
	ReferenceAlignment: ReferenceAlignmentStyle;
	ReflowComments: boolean;
	RemoveBracesLLVM: boolean;
	RemoveParentheses: RemoveParenthesesStyle;
	RemoveSemicolon: boolean;
	RequiresClausePosition: RequiresClausePositionStyle;
	RequiresExpressionIndentation: RequiresExpressionIndentationKind;
	SeparateDefinitionBlocks: SeparateDefinitionStyle;
	ShortNamespaceLines: NaturalNumber;
	SkipMacroDefinitionBody: boolean;
	SortIncludes: SortIncludesOptions;
	SortJavaStaticImport: SortJavaStaticImportOptions;
	SortUsingDeclarations: SortUsingDeclarationsOptions;
	SpaceAfterCStyleCast: boolean;
	SpaceAfterLogicalNot: boolean;
	SpaceAfterTemplateKeyword: boolean;
	SpaceAroundPointerQualifiers: SpaceAroundPointerQualifiersStyle;
	SpaceBeforeAssignmentOperators: boolean;
	SpaceBeforeCaseColon: boolean;
	SpaceBeforeCpp11BracedList: boolean;
	SpaceBeforeCtorInitializerColon: boolean;
	SpaceBeforeInheritanceColon: boolean;
	SpaceBeforeJsonColon: boolean;
	SpaceBeforeParens: SpaceBeforeParensStyle;
	SpaceBeforeParensOptions: SpaceBeforeParensCustom;
	SpaceBeforeRangeBasedForLoopColon: boolean;
	SpaceBeforeSquareBrackets: boolean;
	SpaceInEmptyBlock: boolean;
	SpacesBeforeTrailingComments: NaturalNumber;
	SpacesInAngles: SpacesInAnglesStyle;
	SpacesInContainerLiterals: boolean;
	SpacesInLineCommentPrefix: SpacesInLineComment;
	SpacesInParens: SpacesInParensStyle;
	SpacesInParensOptions: SpacesInParensCustom;
	SpacesInSquareBrackets: boolean;
	Standard: CPPStandard;
	TableGenBreakInsideDAGArg: DAGArgStyle;
	TabWidth: NaturalNumber;
	UseTab: UseTabStyle;
	VerilogBreakBetweenInstancePorts: boolean;
};
